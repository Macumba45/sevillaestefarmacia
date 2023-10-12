import { getAuthenticatedToken } from '../../storage/storage'

export const getUserInfo = async () => {
    try {
        const token = getAuthenticatedToken()
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const response = await fetch('/api/user/getUserInfo', {
            method: 'GET',
            headers,
        })
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            console.error('Error al obtener el usuario')
        }
    } catch (error) {
        console.error('Error al enviar el objeto:', error)
    }
}
