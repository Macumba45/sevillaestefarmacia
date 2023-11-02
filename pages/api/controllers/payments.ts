import { prisma } from '../../../src/lib/client'
import { Payment } from '../../../types/types'
import { markHourAsBooked } from './hours'

export const getPaymentById = async (paymentId: string): Promise<Payment> => {
    const payment = await prisma.payments.findUnique({
        where: {
            id: paymentId,
        },
    })
    if (payment === null) {
        throw new Error('Payment not found')
    }

    return payment
}

export const getPaymentsData = async (): Promise<Payment[]> => {
    const payments = await prisma.payments.findMany({
        orderBy: {
            dateId: 'asc',
        },
        select: {
            id: true,
            dateId: true,
            hourId: true,
            payed: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
            service: true,
        },
    })

    // Obtener los objetos Date y Hour por separado
    const dateIds = payments.map(payment => payment.dateId)
    const hourIds = payments.map(payment => payment.hourId)

    const dates = await prisma.dates.findMany({
        where: {
            id: {
                in: dateIds as string[],
            },
        },
    })

    const hours = await prisma.hours.findMany({
        where: {
            id: {
                in: hourIds as string[],
            },
        },
    })

    // Mapear los resultados para combinarlos
    const paymentsWithDetails: Payment[] = payments.map(payment => {
        const date = dates.find(date => date.id === payment.dateId)
        const hour = hours.find(hour => hour.id === payment.hourId)

        const paymentWithDetails: any = {
            ...payment,
            date: date as any,
            hour: hour as any,
        }

        return paymentWithDetails
    })

    return paymentsWithDetails
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

export const editDateAndHour = async (
    paymentId: string,
    hourId: string,
    dateId: string
): Promise<void> => {
    await prisma.payments.update({
        where: {
            id: paymentId,
        },
        data: {
            dateId: dateId,
            hourId: hourId,
        },
    })
    await markHourAsBooked(hourId)

    return
}

export const getPaymentsByUserId = async (userId: string) => {
    const payments = await prisma.payments.findMany({
        where: {
            userId: userId,
        },
        include: {
            service: {
                include: {
                    dates: {
                        include: {
                            hours: true,
                        },
                    },
                },
            },
        },
    })

    return payments
}
