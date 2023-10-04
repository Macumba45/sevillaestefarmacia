import { NextApiRequest, NextApiResponse } from 'next'
import { deleteService } from '../controllers/services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        try {
            const { id } = req.query
            const service = await deleteService(id as string)
            res.status(200).json(service)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
