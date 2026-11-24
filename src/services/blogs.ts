import { notification } from 'antd'
import { getAuthenticatedToken } from '../../storage/storage'
import { Blogs } from '../../types/types'


const notificationSuccess = (serviceName: string) => {
    notification.success({
        message: `El servicio ${serviceName} se ha creado con éxito`,
        description: 'El servicio se ha creado con éxito.',
        style: {
            marginTop: 50,
        },
    })
}

export const getBlogs = async (): Promise<Blogs[] | undefined> => {
    try {
        const response = await fetch('/api/blogs/getBlogs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

export const createBlog = async (blog: Blogs): Promise<Blogs | undefined> => {
    try {
        const response = await fetch('/api/blogs/postBlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthenticatedToken()}`,
            },
            body: JSON.stringify(blog),
        })
        if (response.ok) {
            const data = await response.json()
            notificationSuccess(blog.title)
            return data
        }
        notification.error({ message: 'No se pudo guardar el cambio' })
    } catch (error) {
        console.log(error)
        notification.error({ message: 'No se pudo guardar el cambio' })
    }
}

export const deleteBlog = async (id: string): Promise<Blogs | undefined> => {
    try {
        const response = await fetch('/api/blogs/deleteBlog', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthenticatedToken()}`,
            },
            body: JSON.stringify({ id }),
        })
        if (response.ok) {
            const data = await response.json()
            notificationSuccess(id)
            return data
        }
        notification.error({ message: 'No se pudo guardar el cambio' })
    } catch (error) {
        console.log(error)
        notification.error({ message: 'No se pudo guardar el cambio' })
    }
}

export const updateBlog = async (taller: Blogs): Promise<Blogs | undefined> => {
    try {
        const response = await fetch('/api/blogs/updateBlog', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthenticatedToken()}`,
            },
            body: JSON.stringify(taller),
        })
        if (response.ok) {
            const data = await response.json()
            notificationSuccess(taller.title)
            return data
        }
        notification.error({ message: 'No se pudo guardar el cambio' })
    } catch (error) {
        console.log(error)
        notification.error({ message: 'No se pudo guardar el cambio' })
    }
}

export const getBlogById = async (id: string): Promise<Blogs> => {
    try {
        const response = await fetch(`/api/blogs/getBlogById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error: any) {
        console.log(error)
    }
    return {} as Blogs
}
