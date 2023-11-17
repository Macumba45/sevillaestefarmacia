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
    today.setHours(0, 0, 0, 0) // Asegúrate de que la hora sea medianoche para comparar correctamente las fechas

    const convertDateStringToDateObject = (dateString: string) => {
        const [day, month, year] = dateString.split('/')
        return new Date(Number(year), Number(month) - 1, Number(day))
    }

    const allDates = await prisma.dates.findMany({
        include: {
            hours: {
                where: {
                    isBooked: false,
                },
            },
        },
    })

    const fechasPasadasConHoras = allDates.filter(fecha => {
        const fechaDate = convertDateStringToDateObject(fecha.dates)
        return fechaDate <= today
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
