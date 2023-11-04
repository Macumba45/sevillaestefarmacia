export const emailConfirmationPaymentCitas = async (
    email: string,
    date: string,
    hour: string
) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        }
        const response = await fetch(
            '/api/nodemailer/emailPaymentConfirmationCitas',
            {
                method: 'POST',
                headers,
                body: JSON.stringify({ email, date, hour }),
            }
        )
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            console.log('error al enviar el email')
        }
    } catch (error) {
        console.error('Error al enviar el email:', error)
    }
}

export const emailConfirmationPaymentService = async (
    email: string,
    serviceId: string
) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        }
        const response = await fetch(
            '/api/nodemailer/emailPaymentConfirmationServicio',
            {
                method: 'POST',
                headers,
                body: JSON.stringify({ email, serviceId }),
            }
        )
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            console.log('error al enviar el email')
        }
    } catch (error) {
        console.error('Error al enviar el email:', error)
    }
}
