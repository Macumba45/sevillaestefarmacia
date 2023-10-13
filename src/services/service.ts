import { notification } from 'antd'
import { getAuthenticatedToken } from '../../storage/storage'
import { Services } from '../../types/types'

export const getServices = async () => {
    try {
        const token = getAuthenticatedToken()
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

export const createService = async (service: Services) => {
    try {
        const token = getAuthenticatedToken()
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
        // En el lugar apropiado de tu componente después de crear o editar un servicio con éxito:
        notification.success({
            message: `El servicio ${service.title} se ha creado/actualizado con éxito`,
            description: 'El servicio se ha creado con éxito.',
            style: {
                marginLeft: 335 - 600,
                marginTop: 50,
            },
        })
    }
}
