import { NextApiRequest, NextApiResponse } from 'next'
import { getDateDataById } from '../controllers/dates'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const dateId = req.query.dateId
            const date = await getDateDataById(dateId as string)
            res.status(200).json(date)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
