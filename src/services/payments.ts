import { notification } from 'antd'
import { getAuthenticatedToken } from '../../storage/storage'


const notificationSuccess = () => {
    notification.success({
        message: `La cita se ha editado con éxito`,
        // description: 'La cita se ha editado con éxito.',
        style: {
            marginTop: 50,
        },
    })
}

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
                Authorization: `Bearer ${getAuthenticatedToken()}`,
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

// Reenvía al servidor los parámetros firmados que Redsys añade a la URL de éxito
export const confirmRedsysPayment = async (signed: Record<string, string>) => {
    try {
        await fetch('/api/redsys/notification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(signed),
        })
    } catch (error) {
        console.log(error)
    }
}

export const fetchPaymentsData = async () => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthenticatedToken()}`,
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

export const editDateAndHourFromPayments = async (
    paymentId: string,
    dateId: string,
    hourId: string
) => {
    try {
        const response = await fetch('/api/payments/editDateAndHour', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthenticatedToken()}`,
            },
            body: JSON.stringify({ paymentId, dateId, hourId }),
        })
        if (response.ok) {
            const data = await response.json()
            notificationSuccess()
            return data
        }
        notification.error({ message: 'No se pudo guardar el cambio' })
    } catch (error) {
        console.log(error)
        notification.error({ message: 'No se pudo guardar el cambio' })
    }
}

export const fetchPaymentById = async (paymentId: string) => {
    try {
        const response = await fetch(
            `/api/payments/getPaymentById?paymentId=${paymentId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getAuthenticatedToken()}`,
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
