import { NextApiRequest, NextApiResponse } from 'next'
import { deleteTaller } from '../controllers/talleres'
import { Talleres } from '../../../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Talleres | { message: string }>
) {
    if (req.method !== 'DELETE') {
        res.status(405).json({ message: 'Método no permitido' })
        return
    }

    try {
        const query = req.query as { id: string }
        const { id } = query
        const taller = await deleteTaller(id)

        res.status(200).json(taller)
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el taller' })
    }
}
