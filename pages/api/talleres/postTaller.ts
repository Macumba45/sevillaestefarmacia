import { NextApiRequest, NextApiResponse } from 'next'
import { createTaller } from '../controllers/talleres'
import { Talleres } from '../../../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Talleres | { message: string }>
) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Método no permitido' })
        return
    }

    try {
        const { title, subtitle, descripcion, urlPicture } =
            req.body as Talleres

        const newTaller = await createTaller(
            title,
            subtitle,
            descripcion,
            urlPicture
        )
        res.status(200).json(newTaller)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el taller' })
    }
}
