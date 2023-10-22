import { NextApiRequest, NextApiResponse } from 'next'
import { markHourAsBooked } from '../controllers/hours'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            // Recupera el ID o identificador único de la hora que el usuario seleccionó
            const hourId = req.body.selectedHourId
            // Marca la hora como reservada en tu base de datos
            await markHourAsBooked(hourId)

            res.status(200).json({ message: 'Hora marcada como reservada' })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
