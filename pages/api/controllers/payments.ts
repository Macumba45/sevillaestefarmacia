import { prisma } from '../../../src/lib/client'

export const makePaymentTrue = async (paymentId: string): Promise<void> => {
    await prisma.payments.update({
        where: {
            id: paymentId,
        },
        data: {
            payed: true,
        },
    })

    return
}
