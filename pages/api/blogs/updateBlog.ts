import { NextApiRequest, NextApiResponse } from 'next'
import { updateBlog } from '../controllers/blogs'
import { Blogs } from '../../../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Blogs | { message: string }>
) {
    if (req.method !== 'PUT') {
        res.status(405).json({ message: 'Método no permitido' })
        return
    }

    try {
        const { id, title, subtitle, descripcion, urlPicture } =
            req.body as Blogs

        const updatedBlog = await updateBlog(
            id as string,
            title,
            subtitle,
            descripcion,
            urlPicture
        )

        res.status(200).json(updatedBlog)
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el blog' })
    }
}
