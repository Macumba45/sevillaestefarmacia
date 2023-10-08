import { Services } from '../../../types/types'
import prisma from '@/lib/client'

export const getServices = async (): Promise<Services[]> => {
    const prismaServices = await prisma.services.findMany()

    if (!prismaServices) {
        return []
    }

    return prismaServices
}

export const createService = async (
    urlVideo: string,
    urlPicture: string,
    title: string,
    descripcion: string,
    dates: Array<string>,
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
                create: dates.map(dates => {
                    return {
                        dates: dates,
                    }
                }),
            },
        },
    })
    return newService
}

export const updateService = async (
    id: string,
    updatedServiceData: Partial<Services>
): Promise<Services | null> => {
    const updatedService = await prisma.services.update({
        where: {
            id: id,
        },
        data: {
            ...updatedServiceData,
            dates: {
                create: updatedServiceData.dates?.map(dates => {
                    return {
                        dates: dates,
                    }
                }),
            },
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

export const findServiceById = async (id: string): Promise<Services | null> => {
    const service = await prisma.services.findUnique({
        where: {
            id: id,
        },
    })
    return service
}
