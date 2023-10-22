import { NextApiRequest, NextApiResponse } from 'next'
import { getPaymentById } from '../controllers/payments'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const paymentId = req.query.paymentId
            const payment = await getPaymentById(paymentId as string)
            res.status(200).json(payment)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
