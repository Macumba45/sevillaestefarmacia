import { prisma } from '../../../src/lib/client'
import { Blogs } from '../../../types/types'

export const getBlogs = async (): Promise<Blogs[]> => {
    const blogs = await prisma.blogs.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    })

    if (!blogs) {
        return []
    }

    return blogs
}

export const createBlog = async (
    title: string,
    subtitle: string,
    descripcion: string,
    urlPicture: string
): Promise<Blogs> => {
    const newBlog = await prisma.blogs.create({
        data: {
            title: title,
            subtitle: subtitle,
            descripcion: descripcion,
            urlPicture: urlPicture,
        },
    })
    return newBlog
}

export const deleteBlog = async (id: string): Promise<Blogs> => {
    const deleteItem = await prisma.blogs.delete({
        where: {
            id: id,
        },
    })
    return deleteItem
}

export const updateBlog = async (
    id: string,
    title: string,
    subtitle: string,
    descripcion: string,
    urlPicture: string
): Promise<Blogs> => {
    const updateBlog = await prisma.blogs.update({
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
    return updateBlog
}

export const getBlogById = async (id: string): Promise<Blogs> => {
    const blog = await prisma.blogs.findUnique({
        where: {
            id: id,
        },
    })
    if (!blog) {
        return {} as Blogs
    }
    return blog
}
