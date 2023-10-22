import { getAuthenticatedToken } from '../../storage/storage'

const token = getAuthenticatedToken()

export const isBookedHour = async (selectedHourId: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const response = await fetch('/api/hours/isBooked', {
            method: 'GET',
            headers,
            body: JSON.stringify({ selectedHourId }),
        })
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            console.error('Error al actualizar la hora')
        }
    } catch (error) {
        console.error('Error al enviar el objeto:', error)
    }
}
