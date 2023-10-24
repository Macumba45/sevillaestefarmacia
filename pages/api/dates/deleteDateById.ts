import { NextApiRequest, NextApiResponse } from 'next'
import { deteleDateId } from '../controllers/dates'

export default async function deleteDateById(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        const { id } = req.body
        if (typeof id !== 'string') {
            throw new Error('ID no válido')
        }
        const date = await deteleDateId(id as string)
        res.status(200).json(date)
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
