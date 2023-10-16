import { NextApiRequest, NextApiResponse } from 'next'
import { serviceById } from '../controllers/services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const query = req.query as { id: string }
            const { id } = query
            if (typeof id !== 'string') {
                throw new Error('ID no válido')
            }
            if (!id) {
                res.status(400).json({ message: 'ID no válido' })
                return
            }

            const services = await serviceById(id as string)
            if (!services) {
                res.status(404).json({ message: 'Servicio no encontrado' })
                return
            }
            res.status(200).json(services)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
