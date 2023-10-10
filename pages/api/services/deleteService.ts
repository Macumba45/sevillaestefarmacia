import { NextApiRequest, NextApiResponse } from 'next'
import { deleteService } from '../controllers/services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        const query = req.query as { id: string }
        const { id } = query
        if (typeof id !== 'string') {
            throw new Error('ID no válido')
        }
        const service = await deleteService(id as string)
        res.status(200).json(service)
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
