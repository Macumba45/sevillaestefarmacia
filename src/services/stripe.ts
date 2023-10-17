import { getAuthenticatedToken } from '../../storage/storage'

export const stripePayment = async (amount: number, id: string) => {
    try {
        const response = await fetch('/api/stripe/checkout_sessions', {
            method: 'POST',
            body: JSON.stringify({ amount, id }),
        })

        console.log(response)
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            return data
        }
    } catch (error) {
        console.log(error)
    }
}
