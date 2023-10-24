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
        const { id } = req.body
        await deleteTaller(id as string)
        res.status(200).json({ message: 'Taller eliminado con  exito' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el taller' })
    }
}
