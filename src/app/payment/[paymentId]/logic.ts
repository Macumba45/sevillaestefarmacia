import { fetchPaymentById, stripePaymentTrue } from '@/services/payments'
import { fetchChargeListStripe, getPaymentById } from '@/services/stripe'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { getAuthenticatedToken } from '../../../../storage/storage'
import { fetchDateById } from '@/services/dates'
import { fetchHourById, fetchIsBookedHour } from '@/services/hours'
import { emailConfirmationPayment } from '@/services/nodemailer'
import { UserContext } from '@/context/UserContext'

export const useLogicPayment = () => {
    const token = getAuthenticatedToken()
    const { user } = useContext(UserContext)
    const [paymentIdMetadata, setPaymentIdMetadata] = useState<string[]>([])
    const [fecha, setFecha] = useState<string>('')
    const [hour, setHour] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const paymentSuccess = async (paymentId: string) => {
        const payment = await stripePaymentTrue(paymentId)
        return payment
    }

    const getPaymentData = async (paymentId: string) => {
        const hourId = await getPaymentById(paymentId)
        await isBookedHour(hourId)
        return
    }

    const getChargeList = async (paymentId: string) => {
        setIsLoading(true)
        const charList = await fetchChargeListStripe(paymentId)
        setPaymentIdMetadata(charList)
        return
    }

    const isBookedHour = async (selectedHourId: string) => {
        const hourBooked = await fetchIsBookedHour(selectedHourId)
        return hourBooked
    }

    const getPyamentById = async (paymentId: string) => {
        const paymentData = await fetchPaymentById(paymentId)
        const dateById = await fetchDateById(paymentData.dateId)
        const hourById = await fetchHourById(paymentData.hourId)
        setFecha(dateById.dates)
        setHour(hourById.hour)
        setIsLoading(false)
        return
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
        emailConfirmationPayment,
    }
}
