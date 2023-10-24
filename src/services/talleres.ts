import { getAuthenticatedToken } from '../../storage/storage'
import { Talleres } from '../../types/types'

const token = getAuthenticatedToken()

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
    }
}

export const deleteTaller = async (
    id: string
): Promise<Talleres | undefined> => {
    console.log(id)
    try {
        const response = await fetch('/api/talleres/deleteTaller', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ id }),
        })
        console.log(response)
        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
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
            body: JSON.stringify({
                taller,
            }),
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    }
}
