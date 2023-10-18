import { Dates, Services } from '../../../types/types'
import { prisma } from '../../../src/lib/client'

export const getServices = async (): Promise<any[]> => {
    const prismaServices = await prisma.services.findMany({
        orderBy: {
            createdAt: 'asc',
        },
        include: {
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
        id: service.id,
        urlPicture: service.urlPicture,
        urlVideo: service.urlVideo,
        title: service.title,
        subtitle: service.subtitle,
        descripcion: service.descripcion,
        price: service.price,
        priceId: service.priceId,
        adminId: service.adminId,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
        dates: service.dates.map(date => ({
            id: date.id,
            date: date.dates,
            hours: date.hours.map(hour => ({
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
    price: string,
    adminId: string,
    priceId: string
): Promise<Services | null> => {
    const newService = await prisma.services.create({
        data: {
            urlVideo: urlVideo,
            urlPicture: urlPicture,
            title: title,
            subtitle: subTitle,
            descripcion: descripcion,
            price: price,
            adminId: adminId,
            priceId: priceId,
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
    dates: Array<{ date: string; hours: string[] }>, // Fechas en formato DD/MM/YYYY
    price: string,
    priceId: string
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
    const existingDates = existingService.dates.map(date => date.dates)

    // Filtra las fechas que ya existen y las que son nuevas
    const existingDateStrings = existingDates.map(date => date.toString())
    // const newDateStrings = dates.map(newDate => newDate.date)

    // Identifica las fechas nuevas
    const datesToAdd = dates.filter(
        newDate => !existingDateStrings.includes(newDate.date)
    )

    // Identifica las fechas existentes que requieren nuevas horas
    const datesToUpdate = dates.filter(newDate =>
        existingDateStrings.includes(newDate.date)
    )

    // Actualiza las fechas existentes con nuevas horas
    for (const newDate of datesToUpdate) {
        const existingDate = existingService.dates.find(
            date => date.dates.toString() === newDate.date
        )

        if (existingDate) {
            const newHoursToAdd = newDate.hours
                .filter(
                    newHour =>
                        !existingDate.hours.some(hour => hour.hour === newHour)
                )
                .map(newHour => ({
                    hour: newHour, // Asegúrate de que newHour sea una cadena (string)
                }))

            await prisma.dates.update({
                where: { id: existingDate.id },
                data: {
                    hours: {
                        create: newHoursToAdd, // Utiliza las horas como cadenas
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
                    create: newDate.hours.map(newHour => ({
                        hour: newHour,
                    })),
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
            priceId: priceId,
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

// export const editDateFromService = async (
//     dateId: string,
//     newDate: string,
//     hours: string
// ): Promise<Dates | null> => {
//     const existingDate = await prisma.dates.findUnique({
//         where: {
//             id: dateId,
//         },
//         include: {
//             hours: true,
//         },
//     })

//     if (!existingDate) {
//         return null
//     }

//     // Actualiza la fecha y la hora
//     const updatedDate = await prisma.dates.update({
//         where: {
//             id: dateId,
//         },
//         data: {
//             dates: newDate,
//             hours: {
//                 update: {
//                     where: {
//                         id: existingDate.hours[0].id,
//                     },
//                     data: {
//                         hour: hours,
//                     },
//                 },
//             },
//         },
//     })

//     return updatedDate
// }

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

    const transformedDates = service.dates.map(date => ({
        date: date.dates,
        hours: date.hours.map(hour => ({
            id: hour.id,
            hour: hour.hour,
            isBooked: hour.isBooked,
        })),
    }))

    // Construir el objeto Services con la estructura esperada
    const serviceData: any = {
        id: service.id,
        urlPicture: service.urlPicture,
        urlVideo: service.urlVideo,
        title: service.title,
        subtitle: service.subtitle,
        descripcion: service.descripcion,
        price: service.price,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
        priceId: service.priceId,
        dates: transformedDates,
    }

    return serviceData
}
