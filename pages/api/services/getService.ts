import { NextApiRequest, NextApiResponse } from 'next'
import { getServices } from '../controllers/services'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const services = await getServices()
            res.status(200).json(services)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
