import { prisma } from '../../../src/lib/client'

export const markHourAsBooked = async (hourId: string): Promise<void> => {
    await prisma.hours.update({
        where: {
            id: hourId,
        },
        data: {
            isBooked: true,
        },
    })
    return
}

export const markHourAsFree = async (hourId: string): Promise<void> => {
    await prisma.hours.update({
        where: {
            id: hourId,
        },
        data: {
            isBooked: false,
        },
    })

    return
}
