import { Services, Dates, Hours } from '../../../types/types'
import prisma from '@/lib/client'

export const getServices = async (): Promise<any[]> => {
    const prismaServices = await prisma.services.findMany({
        include: {
            dates: true,
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
        descripcion: service.descripcion,
        price: service.price,
        adminId: service.adminId,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt,
        dates: service.dates.map(date => ({
            id: date.id,
            date: date.dates,
            // Otras propiedades de Date que desees incluir
        })),
    }))

    return servicesData
}

export const createService = async (
    urlVideo: string,
    urlPicture: string,
    title: string,
    descripcion: string,
    dates: Array<string>, // Fechas en formato DD/MM/YYYY
    hours: Array<Array<string>>, // Horas correspondientes a cada fecha
    price: string,
    adminId: string
): Promise<Services | null> => {
    const newService = await prisma.services.create({
        data: {
            urlVideo: urlVideo,
            urlPicture: urlPicture,
            title: title,
            descripcion: descripcion,
            price: price,
            adminId: adminId,
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

// export const updateService = async (
//     id: string,
//     updatedServiceData: Partial<Services>
// ): Promise<Services | null> => {
//     const updatedService = await prisma.services.update({
//         where: {
//             id: id,
//         },
//         data: {
//             ...updatedServiceData,
//             dates: {
//                 create: updatedServiceData.dates?.map(dates => {
//                     return {
//                         dates: dates,
//                     }
//                 }),
//             },
//         },
//     })
//     return updatedService
// }

export const deleteService = async (id: string): Promise<Services | null> => {
    const deletedService = await prisma.services.delete({
        where: {
            id: id,
        },
    })
    return deletedService
}

export const findServiceById = async (id: string): Promise<Services | null> => {
    const service = await prisma.services.findUnique({
        where: {
            id: id,
        },
    })
    return service
}
