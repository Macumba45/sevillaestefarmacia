import { PrismaClient } from '@prisma/client'
import { Services } from '../../../types/types'

const prisma = new PrismaClient()

export const getServices = async (): Promise<Services[]> => {
    const prismaServices = await prisma.services.findMany()

    if (!prismaServices) {
        return []
    }

    return prismaServices
}

export const createService = async (
    service: Services,
    adminId: string
): Promise<Services | null> => {
    const newService = await prisma.services.create({
        data: {
            ...service,
            adminId: adminId,
        },
    })

    return newService
}

export const updateService = async (
    service: Services
): Promise<Services | null> => {
    const updatedService = await prisma.services.update({
        where: {
            id: service.id,
        },
        data: service,
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
