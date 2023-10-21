import { prisma } from '../../../src/lib/client'
import { Payment } from '../../../types/types'

export const getPaymentsData = async (): Promise<Payment[]> => {
    const payments = await prisma.payments.findMany({
        orderBy: {
            dateId: 'asc', // Esto asume que la propiedad se llama "date" en tu objeto "payment" y que a su vez contiene una propiedad llamada "date" que es una fecha.
        },
        select: {
            id: true,
            payed: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
            service: {
                select: {
                    dates: {
                        include: {
                            hours: true,
                        },
                    },
                    id: true,
                    title: true,
                    subtitle: true,
                    price: true,
                    descripcion: true,
                },
            },
            dateId: true,
            hourId: true,
            createdAt: true,
        },
    })

    // Obtener los objetos Date y Hour por separado
    const dateIds = payments.map(payment => payment.dateId)
    const hourIds = payments.map(payment => payment.hourId)

    const dates = await prisma.dates.findMany({
        where: {
            id: {
                in: dateIds,
            },
        },
    })

    const hours = await prisma.hours.findMany({
        where: {
            id: {
                in: hourIds,
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

    return
}
