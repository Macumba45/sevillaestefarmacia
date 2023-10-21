import { NextApiRequest, NextApiResponse } from 'next'
import { editDateAndHour } from '../controllers/payments'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'PUT') {
        try {
            const paymentId = req.body.paymentId
            const dateId = req.body.dateId
            const hourId = req.body.hourId

            await editDateAndHour(paymentId, dateId, hourId)

            res.status(200).json({ message: 'Fecha y hora actualizadas' })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
