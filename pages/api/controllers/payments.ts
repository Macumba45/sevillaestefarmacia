import { prisma } from '../../../src/lib/client'
import { Payment } from '../../../types/types'

export const getPaymentsData = async (): Promise<Payment[]> => {
    const payments = await prisma.payments.findMany({
        orderBy: {
            createdAt: 'asc',
        },
        select: {
            id: true,
            payed: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            service: true,
            dateId: true,
            hourId: true,
            createdAt: true,
        },
    })

    return payments
}

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
