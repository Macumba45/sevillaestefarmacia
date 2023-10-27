import { NextApiRequest, NextApiResponse } from 'next'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const priceId = req.body.priceId
            const paymentId = req.body.paymentId
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: priceId,
                        quantity: 1,
                    },
                ],
                invoice_creation: {
                    enabled: true,
                },
                mode: 'payment',
                payment_method_types: ['card'],
                success_url: `${req.headers.origin}/payment/${paymentId}`,
                cancel_url: `${req.headers.origin}/payment/canceled`,
                metadata: {
                    paymentId: paymentId,
                },
            })
            res.status(200).json(session)
        } catch (err: any) {
            res.status(err.statusCode || 500).json(err.message)
        }
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}
