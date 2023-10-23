import { NextApiRequest, NextApiResponse } from 'next'
import { updateTaller } from '../controllers/talleres'
import { Talleres } from '../../../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Talleres | { message: string }>
) {
    if (req.method !== 'PUT') {
        res.status(405).json({ message: 'Método no permitido' })
        return
    }

    try {
        const { id, title, subtitle, date, descripcion, urlPicture } =
            req.body as Talleres

        const newTaller = await updateTaller(
            id,
            title,
            subtitle,
            date,
            descripcion,
            urlPicture
        )

        res.status(200).json(newTaller)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el taller' })
    }
}
