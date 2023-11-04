import { fetchPaymentById, stripePaymentTrue } from '@/services/payments'
import { fetchChargeListStripe, getPaymentById } from '@/services/stripe'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { getAuthenticatedToken } from '../../../../storage/storage'
import { fetchDateById } from '@/services/dates'
import { fetchHourById, fetchIsBookedHour } from '@/services/hours'
import { emailConfirmationPaymentCitas } from '@/services/nodemailer'
import { UserContext } from '@/context/UserContext'

export const useLogicPayment = () => {
    const token = getAuthenticatedToken()
    const { user } = useContext(UserContext)
    const [paymentIdMetadata, setPaymentIdMetadata] = useState<string[]>([])
    const [serviceIdMetadata, setServiceIdMetadata] = useState<string>('')
    const [fecha, setFecha] = useState<string>('')
    const [hour, setHour] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const paymentSuccess = async (paymentId: string) => {
        const payment = await stripePaymentTrue(paymentId)
        return payment
    }

    const getChargeList = async (paymentId: string) => {
        const charList = await fetchChargeListStripe(paymentId)
        setPaymentIdMetadata(charList.paymentId)
        setServiceIdMetadata(charList.serviceId)

        // Verificar si es el servicio especial sin fecha ni hora
        if (
            serviceIdMetadata &&
            serviceIdMetadata === 'clo0e17d30004xy04cjklg2px'
        ) {
            // Realizar el pago a true y enviar el correo
            await paymentSuccess(paymentId)
            return null
        }

        // Si no es el servicio especial, continúa con la consulta de fechas y horas
        return
    }

    const getPyamentById = async (paymentId: string) => {
        const paymentData = await fetchPaymentById(paymentId)
        if (
            serviceIdMetadata &&
            serviceIdMetadata === 'clo0e17d30004xy04cjklg2px'
        ) {
            return ''
        } else if (
            serviceIdMetadata &&
            serviceIdMetadata !== 'clo0e17d30004xy04cjklg2px'
        ) {
            const dateById = await fetchDateById(paymentData.dateId)
            const hourById = await fetchHourById(paymentData.hourId)
            setFecha(dateById.dates)
            setHour(hourById.hour)
        }
        return
    }

    const getPaymentData = async (paymentId: string) => {
        const hourId = await getPaymentById(paymentId)

        // Verificar si es el servicio especial sin fecha ni hora
        if (
            serviceIdMetadata &&
            serviceIdMetadata === 'clo0e17d30004xy04cjklg2px'
        ) {
            // Realizar el pago a true y enviar el correo
            await paymentSuccess(paymentId)
            return null
        }

        // Si no es el servicio especial, realiza las acciones normales
        await isBookedHour(hourId as string)
        return
    }

    const isBookedHour = async (selectedHourId: string) => {
        const hourBooked = await fetchIsBookedHour(selectedHourId)
        return hourBooked
    }

    return {
        isBookedHour,
        paymentSuccess,
        router,
        getPaymentData,
        getChargeList,
        paymentIdMetadata,
        getPyamentById,
        fecha,
        hour,
        isLoading,
        user,
        emailConfirmationPaymentCitas,
        serviceIdMetadata,
        setIsLoading,
    }
}
