export const emailConfirmationPaymentCitas = async (
    email: string,
    date: string,
    hour: string,
    userName: string,
    priceService: string,
    titleService: string
) => {
    console.log(email, date, hour, userName, priceService)
    try {
        const headers = {
            'Content-Type': 'application/json',
        }
        const response = await fetch(
            '/api/nodemailer/emailPaymentConfirmationCitas',
            {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    email,
                    date,
                    hour,
                    userName,
                    priceService,
                    titleService,
                }),
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
    titleService: string
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
                body: JSON.stringify({ email, titleService }),
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
