import { NextApiRequest, NextApiResponse } from 'next'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            res.status(401).json({
                message: 'No tienes permiso para acceder a esta información',
            })
            return
        }
        const events = await stripe.events.list({
            limit: 100,
            type: 'checkout.session.completed',
        })
        res.status(200).json(events.data)
    } catch (error) {
        console.error('Error al listar los eventos:', error)
        res.status(500).json({ error: 'No se pudieron obtener los eventos' })
    }
}
