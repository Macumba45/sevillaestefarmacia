import { fetchPaymentById, stripePaymentTrue } from '@/services/payments'
import { fetchChargeListStripe, getPaymentById } from '@/services/stripe'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { fetchDateById } from '@/services/dates'
import { fetchHourById, fetchIsBookedHour } from '@/services/hours'
import { emailConfirmationPaymentCitas } from '@/services/nodemailer'
import { UserContext } from '@/context/UserContext'
import { getServiceDetails } from '@/services/service'

export const useLogicPayment = () => {
    const { user } = useContext(UserContext)
    const [fecha, setFecha] = useState<string>('')
    const [hour, setHour] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [titleService, setTitleService] = useState<string>('')
    const [serviceId, setServiceId] = useState<string>('')
    const [priceService, setPriceService] = useState<string>('')
    const router = useRouter()

    const paymentSuccess = async (paymentId: string) => {
        const payment = await stripePaymentTrue(paymentId)
        return payment
    }

    const getPyamentById = async (paymentId: string) => {
        const paymentData = await fetchPaymentById(paymentId)
        setServiceId(paymentData.serviceId)
        if (serviceId && serviceId === 'clo0e17d30004xy04cjklg2px') {
            return ''
        } else if (serviceId && serviceId !== 'clo0e17d30004xy04cjklg2px') {
            const dateById = await fetchDateById(paymentData.dateId)
            const hourById = await fetchHourById(paymentData.hourId)
            setFecha(dateById.dates)
            setHour(hourById.hour)
        }
        return
    }

    const getPaymentData = async (paymentId: string) => {
        const hourId = await getPaymentById(paymentId)
        if (serviceId && serviceId === 'clo0e17d30004xy04cjklg2px') {
            await getServiceDetails(serviceId)
            return null
        }

        await isBookedHour(hourId as string)
        return
    }

    const isBookedHour = async (selectedHourId: string) => {
        const hourBooked = await fetchIsBookedHour(selectedHourId)
        return hourBooked
    }

    const getServiceTitle = async (serviceId: string) => {
        const data = await getServiceDetails(serviceId)
        setTitleService(data.title)
        setPriceService(data.price)
        return data
    }

    return {
        isBookedHour,
        paymentSuccess,
        router,
        getPaymentData,
        getPyamentById,
        fecha,
        hour,
        isLoading,
        user,
        emailConfirmationPaymentCitas,
        setIsLoading,
        getServiceTitle,
        titleService,
        serviceId,
        priceService,
    }
}
