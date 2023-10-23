import { NextApiRequest, NextApiResponse } from 'next'
import { editDateAndHour, getPaymentById } from '../controllers/payments'
import { markHourAsBooked, markHourAsFree } from '../controllers/hours'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'PUT') {
        try {
            const paymentId = req.body.paymentId
            const dateId = req.body.dateId
            const hourId = req.body.hourId

            // Antes de actualizar la hora, obtén la información de la hora anterior
            const paymentInfo = await getPaymentById(paymentId)
            const previousHourId = paymentInfo.hourId
            // Marca la hora anterior como no reservada
            if (previousHourId) {
                await markHourAsFree(previousHourId)
            }

            // Actualiza la hora con la nueva hourId
            await editDateAndHour(paymentId, dateId, hourId)

            res.status(200).json({ message: 'Fecha y hora actualizadas' })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
