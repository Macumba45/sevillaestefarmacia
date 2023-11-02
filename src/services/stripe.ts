import { getAuthenticatedToken } from '../../storage/storage'

const token = getAuthenticatedToken()

export const stripePayment = async (
    amount: number,
    priceId: string,
    paymentId: string
) => {
    try {
        const response = await fetch('/api/stripe/checkout_sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, priceId, paymentId }),
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

export const getPaymentById = async (paymentId: string) => {
    try {
        const response = await fetch(
            `/api/payments/getPaymentById?paymentId=${paymentId}`,
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
            return data.hourId
        }
    } catch (error) {
        console.log(error)
    }
}

export const fetchChargeListStripe = async (paymentId: string) => {
    try {
        const response = await fetch('/api/stripe/charge_list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
        if (response.ok) {
            const data = await response.json()
            const findPaymentId = data
                .map((event: any) => {
                    if (event.data.object.metadata.paymentId === paymentId) {
                        return event.data.object.metadata.paymentId
                    }
                })
                .filter((paymentId: string) => paymentId !== undefined)
            return findPaymentId
        }
    } catch (error) {
        console.log(error)
    }
}
