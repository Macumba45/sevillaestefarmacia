import { getAuthenticatedToken } from '../../storage/storage'

const token = getAuthenticatedToken()

export const stripePayment = async (
    amount: number,
    priceId: string,
    paymentId: string,
    serviceId: string,
    userName: string,
    priceService: string
) => {
    try {
        const response = await fetch('/api/stripe/checkout_sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount,
                priceId,
                paymentId,
                serviceId,
                userName,
                priceService,
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

            // Crear un objeto vacío para almacenar los datos
            const resultObject: any = {}

            // Iterar sobre los datos y agregar propiedades al objeto
            data.forEach((event: any) => {
                if (event.data.object.metadata.paymentId === paymentId) {
                    resultObject.paymentId =
                        event.data.object.metadata.paymentId
                    resultObject.serviceId =
                        event.data.object.metadata.serviceId
                    resultObject.userName = event.data.object.metadata.userName
                    resultObject.priceService =
                        event.data.object.metadata.priceService
                }
            })

            return resultObject
        }
    } catch (error) {
        console.log(error)
    }
}
