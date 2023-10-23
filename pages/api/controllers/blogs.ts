import { prisma } from '../../../src/lib/client'
import { Blogs } from '../../../types/types'

export const getBlogs = async (): Promise<Blogs[]> => {
    const prismaBlogs = await prisma.blogs.findMany({
        orderBy: {
            createdAt: 'asc',
        },
    })

    if (!prismaBlogs) {
        return []
    }

    return prismaBlogs
}

export const createBlog = async (
    id: string,
    title: string,
    subtitle: string,
    date: string,
    descripcion: string,
    urlPicture: string,
    createdAt: Date,
    updatedAt: Date
): Promise<Blogs> => {
    const newBlog = await prisma.blogs.create({
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
    return newBlog
}

export const deleteBlog = async (id: string): Promise<Blogs> => {
    const blog = await prisma.blogs.delete({
        where: {
            id: id,
        },
    })
    return blog
}

export const updateBlog = async (
    id: string,
    title: string,
    subtitle: string,
    date: string,
    descripcion: string,
    urlPicture: string,
    createdAt: Date,
    updatedAt: Date
): Promise<Blogs> => {
    const blog = await prisma.blogs.update({
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
    return blog
}
