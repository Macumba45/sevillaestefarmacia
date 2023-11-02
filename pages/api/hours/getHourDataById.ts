import { NextApiRequest, NextApiResponse } from 'next'
import { getHourDataById } from '../controllers/hours'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const hourId = req.query.hourId
            const hour = await getHourDataById(hourId as string)
            res.status(200).json(hour)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
