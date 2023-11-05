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

export const getHourDataById = async (id: string) => {
    const hour = await prisma.hours.findUnique({
        where: {
            id: id,
        },
    })

    return hour
}

export const eliminarHorasPasadas = async () => {
    const today = new Date()

    function formatDate(date: Date) {
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    const formattedToday = formatDate(today)

    const fechasPasadasConHoras = await prisma.dates.findMany({
        where: {
            dates: {
                lt: formattedToday,
            },
        },
        include: {
            hours: {
                where: {
                    isBooked: false,
                },
            },
        },
    })

    for (const fecha of fechasPasadasConHoras) {
        for (const hora of fecha.hours) {
            await eliminarHoraPasada(hora.id)
        }
    }

    return fechasPasadasConHoras
}

const eliminarHoraPasada = async (horaId: string) => {
    // Agrega aquí la lógica para eliminar la hora con el ID proporcionado
    await prisma.hours.delete({
        where: {
            id: horaId,
        },
    })
}
