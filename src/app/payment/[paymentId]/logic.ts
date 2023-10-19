import { stripePaymentTrue } from '@/services/payments'
import { useRouter } from 'next/navigation'

export const useLogicPayment = () => {
    const router = useRouter()
    const paymentSuccess = async (paymentId: string) => {
        const payment = await stripePaymentTrue(paymentId)
        return payment
    }

    return {
        paymentSuccess,
        router,
    }
}
