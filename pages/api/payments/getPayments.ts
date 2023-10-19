import { NextApiRequest, NextApiResponse } from 'next'
import { getPaymentsData } from '../controllers/payments'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const payments = await getPaymentsData()
            res.status(200).json(payments)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
