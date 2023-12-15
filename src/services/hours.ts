import { getAuthenticatedToken } from '../../storage/storage'

const token = getAuthenticatedToken()

export const fetchIsBookedHour = async (selectedHourId: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const response = await fetch('/api/hours/isBooked', {
            method: 'POST',
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

export const fetchHourById = async (id: string) => {
    try {
        const response = await fetch(
            `/api/hours/getHourDataById?hourId=${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteHourById = async (id: string) => {
    console.log('id', id)
    try {
        const response = await fetch('/api/hours/deleteHourById', {
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
    }
}
