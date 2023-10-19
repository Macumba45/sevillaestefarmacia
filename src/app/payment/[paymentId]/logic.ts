import { stripePaymentTrue } from '@/services/payments'

export const useLogicPayment = () => {
    const paymentSuccess = async (paymentId: string) => {
        await stripePaymentTrue(paymentId)
        return
    }

    return {
        paymentSuccess,
    }
}
