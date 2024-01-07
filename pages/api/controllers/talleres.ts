import { prisma } from '../../../src/lib/client'
import { Talleres } from '../../../types/types'

export const getTalleres = async (): Promise<Talleres[]> => {
    const prismaTalleres = await prisma.talleres.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    })

    if (!prismaTalleres) {
        return []
    }

    return prismaTalleres
}

export const createTaller = async (
    title: string,
    subtitle: string,
    descripcion: string,
    urlPicture: string
): Promise<Talleres> => {
    const newTaller = await prisma.talleres.create({
        data: {
            title: title,
            subtitle: subtitle,
            descripcion: descripcion,
            urlPicture: urlPicture,
        },
    })
    return newTaller
}

export const deleteTaller = async (id: string): Promise<Talleres> => {
    const taller = await prisma.talleres.delete({
        where: {
            id: id,
        },
    })
    return taller
}

export const updateTaller = async (
    id: string,
    title: string,
    subtitle: string,
    descripcion: string,
    urlPicture: string
): Promise<Talleres> => {
    const taller = await prisma.talleres.update({
        where: {
            id: id,
        },
        data: {
            title: title,
            subtitle: subtitle,
            descripcion: descripcion,
            urlPicture: urlPicture,
        },
    })
    return taller
}

export const getTallerById = async (id: string): Promise<Talleres> => {
    const taller = await prisma.talleres.findUnique({
        where: {
            id: id,
        },
    })
    if (!taller) {
        return {} as Talleres
    }
    return taller
}
