import { NextApiRequest, NextApiResponse } from 'next'
import { makePaymentTrue } from '../controllers/payments'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'PUT') {
        const { paymentId } = req.body
        if (typeof paymentId !== 'string') {
            throw new Error('ID no válido')
        }
        await makePaymentTrue(paymentId)
        res.status(200).json({ message: 'Pago realizado' })
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
