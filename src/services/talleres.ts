import { notification } from 'antd'
import { getAuthenticatedToken } from '../../storage/storage'
import { Talleres } from '../../types/types'

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

export const getTalleres = async (): Promise<Talleres[] | undefined> => {
    try {
        const response = await fetch('/api/talleres/getTalleres', {
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

export const createTaller = async (
    taller: Talleres
): Promise<Talleres | undefined> => {
    try {
        const response = await fetch('/api/talleres/postTaller', {
            method: 'POST',
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

export const deleteTaller = async (
    id: string
): Promise<Talleres | undefined> => {
    try {
        const response = await fetch('/api/talleres/deleteTaller', {
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

export const updateTaller = async (
    taller: Talleres
): Promise<Talleres | undefined> => {
    try {
        const response = await fetch('/api/talleres/updateTaller', {
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

export const getTallerById = async (id: string) => {
    try {
        const response = await fetch(`/api/talleres/getTallerById?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            const data: Talleres = await response.json()
            return data
        }
    } catch (error: any) {
        console.log(error)
    }
}
