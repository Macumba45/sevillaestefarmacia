import { NextApiRequest, NextApiResponse } from 'next'
import { getTalleres } from '../controllers/talleres'
import { Talleres } from '../../../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Talleres[] | { message: string }>
) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Método no permitido' })
        return
    }

    try {
        const talleres = await getTalleres()
        res.status(200).json(talleres)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los talleres' })
    }
}
