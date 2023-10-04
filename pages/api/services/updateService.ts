import { NextApiRequest, NextApiResponse } from 'next'
import { updateService } from '../controllers/services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'PUT') {
        try {
            const { id } = req.query
            const service = await updateService(id as string, req.body)
            res.status(200).json(service)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
