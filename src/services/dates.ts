import { notification } from 'antd'
import { getAuthenticatedToken } from '../../storage/storage'
import { Talleres } from '../../types/types'

const token = getAuthenticatedToken()

export const deleteDateById = async (
    id: string
): Promise<Talleres | undefined> => {
    try {
        const response = await fetch('/api/dates/deleteDateById', {
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
