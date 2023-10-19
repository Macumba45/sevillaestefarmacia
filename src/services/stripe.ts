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
