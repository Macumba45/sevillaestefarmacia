import { Dates, Payment, Services } from '../../../types/types'
import { prisma } from '../../../src/lib/client'

export const getServices = async (): Promise<Services[]> => {
    const prismaServices = await prisma.services.findMany({
        orderBy: {
            createdAt: 'asc',
        },
        include: {
            payments: {
                select: {
                    id: true,
                    payed: true,
                    dateId: true,
                    hourId: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                        },
                    },
                },
            },
            users: {
                select: {
                    id: true,
                },
            },
            dates: {
                include: {
                    hours: true,
                },
            },
        },
    })
    if (!prismaServices) {
        return []
    }

    // Mapear los datos para estructurarlos como desees
    const servicesData = prismaServices.map(service => ({
        // users: service.users,
        id: service.id,
        urlPicture: service.urlPicture,
        urlVideo: service.urlVideo,
        title: service.title,
        subtitle: service.subtitle,
        descripcion: service.descripcion,
        price: service.price,
        priceId: service.priceId as string,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
        payment: service.payments as Payment[],
        dates: service.dates.map((date: any) => ({
            id: date.id,
            date: date.dates,
            hours: date.hours.map((hour: any) => ({
                id: hour.id,
                hour: hour.hour,
                isBooked: hour.isBooked,
            })),
        })),
    }))
    return servicesData
}

export const createService = async (
    urlVideo: string,
    urlPicture: string,
    title: string,
    subTitle: string,
    descripcion: string,
    dates: Array<string>, // Fechas en formato DD/MM/YYYY
    hours: Array<Array<string>>, // Horas correspondientes a cada fecha
    price: string
): Promise<Services | null> => {
    const newService = await prisma.services.create({
        data: {
            urlVideo: urlVideo,
            urlPicture: urlPicture,
            title: title,
            subtitle: subTitle,
            descripcion: descripcion,
            price: price,
            dates: {
                create: dates.map((date, index) => {
                    return {
                        dates: date,
                        hours: {
                            create: hours[index].map(hour => {
                                return {
                                    hour: hour,
                                }
                            }),
                        },
                    }
                }),
            },
        },
    })
    return newService
}

export const updateService = async (
    id: string,
    urlVideo: string,
    urlPicture: string,
    title: string,
    subtitle: string,
    descripcion: string,
    dates: Array<{
        date: string
        hours: (string | { id: string; hour: string })[]
    }>, // Fechas en formato DD/MM/YYYY
    price: string
): Promise<Services | null> => {
    // Obtén el servicio existente
    const existingService = await prisma.services.findUnique({
        where: {
            id: id,
        },
        include: {
            dates: {
                include: {
                    hours: true,
                },
            },
        },
    })

    if (!existingService) {
        // Manejar el caso en el que el servicio no existe
        return null
    }

    // Obtén las fechas existentes
    const existingDates = existingService.dates.map((date: any) => date.dates)

    // Filtra las fechas que ya existen y las que son nuevas
    const existingDateStrings = existingDates.map((date: any) =>
        date.toString()
    )
    // const newDateStrings = dates.map(newDate => newDate.date)

    // Identifica las fechas nuevas
    const datesToAdd = dates.filter(
        newDate => !existingDateStrings.includes(newDate.date)
    )

    // Identifica las fechas existentes que requieren nuevas horas
    const datesToUpdate = dates.filter(newDate =>
        existingDateStrings.includes(newDate.date)
    )

    for (const newDate of datesToUpdate) {
        const existingDate = existingService.dates.find(
            (date: any) => date.dates.toString() === newDate.date
        )

        if (existingDate) {
            const newHoursToAdd = newDate.hours
                .filter(newHour => {
                    if (typeof newHour === 'string') {
                        // Si es una cadena, verificar si ya existe
                        return !existingDate.hours.some(
                            (hour: any) => hour.hour === newHour
                        )
                    } else {
                        // Si es un objeto, verificar si la hora ya existe
                        return !existingDate.hours.some(
                            (hour: any) => hour.hour === newHour.hour
                        )
                    }
                })
                .map(newHour => {
                    if (typeof newHour === 'string') {
                        // Si es una cadena, simplemente crea el objeto de hora
                        return { hour: newHour }
                    } else {
                        // Si es un objeto, úsalo tal como está
                        return newHour
                    }
                })

            await prisma.dates.update({
                where: { id: existingDate.id },
                data: {
                    hours: {
                        create: newHoursToAdd,
                    },
                },
            })
        }
    }

    // Crea las fechas nuevas con sus horas
    for (const newDate of datesToAdd) {
        await prisma.dates.create({
            data: {
                dates: newDate.date,
                hours: {
                    create: newDate.hours.map(newHour => {
                        if (typeof newHour === 'string') {
                            // Si es una cadena, crea el objeto Hours
                            return { hour: newHour }
                        } else {
                            // Si es un objeto, úsalo tal como está
                            return newHour
                        }
                    }),
                },
                service: {
                    connect: {
                        id: existingService.id,
                    },
                },
            },
        })
    }
    // Actualiza otros campos en el servicio si es necesario
    const updatedService = await prisma.services.update({
        where: {
            id: id,
        },
        data: {
            urlVideo: urlVideo,
            urlPicture: urlPicture,
            title: title,
            subtitle: subtitle,
            descripcion: descripcion,
            price: price,
        },
    })

    return updatedService
}

export const deleteService = async (id: string): Promise<Services | null> => {
    const deletedService = await prisma.services.delete({
        where: {
            id: id,
        },
    })
    return deletedService
}

export const serviceById = async (id: string): Promise<Services | null> => {
    const service = await prisma.services.findUnique({
        where: {
            id: id,
        },
        include: {
            dates: {
                include: {
                    hours: {
                        select: {
                            id: true,
                            hour: true,
                            isBooked: true,
                        },
                    },
                },
            },
        },
    })

    if (!service) {
        return null
    }

    const transformedDates = service.dates.map((date: any) => ({
        id: date.id, // Agregar la id de la fecha
        date: date.dates,
        hours: date.hours.map((hour: any) => ({
            id: hour.id,
            hour: hour.hour,
            isBooked: hour.isBooked,
        })),
    }))

    // Construir el objeto Services con la estructura esperada
    const serviceData: Services = {
        id: service.id,
        priceId: service.priceId,
        urlPicture: service.urlPicture,
        urlVideo: service.urlVideo,
        title: service.title,
        subtitle: service.subtitle,
        descripcion: service.descripcion,
        price: service.price,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
        dates: transformedDates,
    }

    return serviceData
}
