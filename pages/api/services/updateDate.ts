import { NextApiRequest, NextApiResponse } from 'next'
import { editDateFromService } from '../controllers/services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'PUT') {
        const { dateId, newDate, hours } = req.body
        const date = await editDateFromService(
            dateId as string,
            newDate as string,
            hours as string
        )
        res.status(200).json(date)
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
