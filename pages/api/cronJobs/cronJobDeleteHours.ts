import { eliminarHorasPasadas } from '../controllers/hours'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Método no permitido' })
    }
    try {
        const horasPasadas = await eliminarHorasPasadas()
        res.status(200).json(horasPasadas)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
