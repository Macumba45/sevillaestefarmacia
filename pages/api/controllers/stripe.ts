import { prisma } from '../../../src/lib/client'

export const createPayment = async (
    userId: string,
    serviceId: string,
    dateId: string,
    hourId: string
) => {
    try {
        const newPayment = await prisma.payments.create({
            data: {
                userId: userId,
                serviceId: serviceId,
                dateId: dateId,
                hourId: hourId,
                payed: false, // Puedes establecer el valor inicial según tus necesidades
            },
        })

        return newPayment
    } catch (error) {
        console.error('Error al crear el pago:', error)
        throw error
    }
}
