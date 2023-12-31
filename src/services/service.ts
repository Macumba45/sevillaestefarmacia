import { notification } from 'antd'
import { getAuthenticatedToken } from '../../storage/storage'
import { Services } from '../../types/types'

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

export const getServices = async (): Promise<Services[] | undefined> => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const response = await fetch('/api/services/getService', {
            method: 'GET',
            headers,
        })
        if (response.ok) {
            const data: Services[] = await response.json()
            return data
        } else {
            console.error('Error al obtener los servicios')
        }
    } catch (error) {
        console.error('Error al enviar el objeto:', error)
    }
}

export const createService = async (
    service: Services
): Promise<Services | undefined> => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const response = await fetch('/api/services/postService', {
            method: 'POST',
            headers,
            body: JSON.stringify(service),
        })
        if (response.ok) {
            const data: Services = await response.json()
            return data
        } else {
            console.error('Error al crear el servicio')
        }
    } catch (error) {
        console.error('Error al enviar el objeto:', error)
    } finally {
        notificationSuccess(service.title)
    }
}

export const updateService = async (
    service: Services
): Promise<Services | undefined> => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const response = await fetch('/api/services/updateService', {
            method: 'PUT',
            headers,
            body: JSON.stringify(service),
        })
        if (response.ok) {
            const data: Services = await response.json()
            return data
        } else {
            console.error('Error al actualizar el servicio')
        }
    } catch (error) {
        console.error('Error al enviar el objeto:', error)
    } finally {
        notificationSuccess(service.title)
    }
}

export const deleteService = async (
    serviceId: string
): Promise<Services | undefined> => {
    try {
        const headers = {
            'Content-Type': 'application.json',
            Authorization: `Bearer ${token}`,
        }
        const response = await fetch(
            `/api/services/deleteService?id=${serviceId}`,
            {
                method: 'DELETE',
                headers,
            }
        )
        if (response.ok) {
            const data: Services = await response.json()
            notificationSuccess(data.title)
            return data
        } else {
            console.error('Error al eliminar el servicio')
        }
    } catch (error) {
        console.error('Error al enviar el objeto:', error)
    }
}

export const getServiceDetails = async (id: string) => {
    try {
        const token = getAuthenticatedToken()
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Agregar el token al header 'Authorization'
        }
        const response = await fetch(`/api/services/serviceDetails?id=${id}`, {
            method: 'GET',
            headers,
        })
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            throw new Error('Error en la respuesta del servidor')
        }
    } catch (error) {
        console.error('Error al enviar el objeto:', error)
    }
}
