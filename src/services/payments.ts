import { getAuthenticatedToken } from '../../storage/storage'

const token = getAuthenticatedToken()

export const stripePaymentInProgress = async (
    userId: string,
    serviceId: string,
    dateId: string,
    hourId: string
) => {
    try {
        const response = await fetch('/api/stripe/paymentStripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, serviceId, dateId, hourId }),
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

export const stripePaymentTrue = async (paymentId: string) => {
    try {
        const response = await fetch('/api/payments/paymentSuccess', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentId }),
        })
        if (response.ok) {
            const data = await response.json()
            return data
        } else if (response.status === 500) {
            window.location.href = '/'
        }
    } catch (error) {
        console.log(error)
    }
}

export const fetchPaymentsData = async () => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
        const response = await fetch('/api/payments/getPayments', {
            method: 'GET',
            headers,
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
    }
}
