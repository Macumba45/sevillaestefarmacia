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
            const serviceId = req.body.serviceId
            const userName = req.body.userName
            const priceService = req.body.priceService
            console.log(priceId, paymentId, serviceId, userName, priceService)
            // Create Checkout Sessions from body params.
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
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
                    serviceId: serviceId,
                    userName: userName,
                    priceService: priceService,
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
