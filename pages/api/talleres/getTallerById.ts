import { NextApiRequest, NextApiResponse } from 'next'
import { getTallerById } from '../controllers/talleres'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const { id } = req.query
            const taller = await getTallerById(id as string)
            res.status(200).json(taller)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
