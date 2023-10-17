import { getAuthenticatedToken } from '../../storage/storage'

const token = getAuthenticatedToken()

export const stripePayment = async (amount: string, id: string) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const response = await fetch('/api/stripe/checkoutSessions', {
            method: 'POST',
            headers,
            body: JSON.stringify({ amount, id }),
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
