import { stripePaymentTrue } from '@/services/payments'
import { getPaymentById } from '@/services/stripe'
import { useRouter } from 'next/navigation'

export const useLogicPayment = () => {
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

    // const hourIsBooked = async (selectedHourId: string) => {
    //     await isBookedHour(selectedHourId)
    //     return
    // }

    const isBookedHour = async (selectedHourId: string) => {
        const response = await fetch('/api/hours/isBooked', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedHourId }),
        })

        const data = await response.json()
        return data
    }

    return {
        isBookedHour,
        paymentSuccess,
        router,
        getPaymentData,
    }
}
