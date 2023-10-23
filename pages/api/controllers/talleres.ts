import { prisma } from '../../../src/lib/client'
import { Talleres } from '../../../types/types'

export const getTalleres = async (): Promise<Talleres[]> => {
    const prismaTalleres = await prisma.talleres.findMany({
        orderBy: {
            createdAt: 'asc',
        },
    })

    if (!prismaTalleres) {
        return []
    }

    return prismaTalleres
}

export const createTaller = async (
    id: string,
    title: string,
    subtitle: string,
    date: string,
    descripcion: string,
    urlPicture: string,
    createdAt: Date,
    updatedAt: Date
): Promise<Talleres> => {
    const newTaller = await prisma.talleres.create({
        data: {
            id: id,
            title: title,
            subtitle: subtitle,
            date: date,
            descripcion: descripcion,
            urlPicture: urlPicture,
            createdAt: createdAt,
            updatedAt: updatedAt,
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
    date: string,
    descripcion: string,
    urlPicture: string,
    createdAt: Date,
    updatedAt: Date
): Promise<Talleres> => {
    const taller = await prisma.talleres.update({
        where: {
            id: id,
        },
        data: {
            title: title,
            subtitle: subtitle,
            date: date,
            descripcion: descripcion,
            urlPicture: urlPicture,
            createdAt: createdAt,
            updatedAt: updatedAt,
        },
    })
    return taller
}
