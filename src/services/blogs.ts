import { notification } from 'antd'
import { getAuthenticatedToken } from '../../storage/storage'
import { Blogs } from '../../types/types'

const token = getAuthenticatedToken()

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
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(blog),
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    } finally {
        notificationSuccess(blog.title)
    }
}

export const deleteBlog = async (id: string): Promise<Blogs | undefined> => {
    try {
        const response = await fetch('/api/blogs/deleteBlog', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id }),
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    } finally {
        notificationSuccess(id)
    }
}

export const updateBlog = async (taller: Blogs): Promise<Blogs | undefined> => {
    try {
        const response = await fetch('/api/blogs/updateBlog', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(taller),
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    } finally {
        notificationSuccess(taller.title)
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
