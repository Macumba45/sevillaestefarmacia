import { NextApiRequest, NextApiResponse } from 'next'
import { createBlog } from '../controllers/blogs'
import { Blogs } from '../../../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Blogs | { message: string }>
) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Método no permitido' })
        return
    }

    try {
        const { title, subtitle, descripcion, urlPicture } = req.body as Blogs

        const newBlog = await createBlog(
            title,
            subtitle,
            descripcion,
            urlPicture
        )
        res.status(200).json(newBlog)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el blog' })
    }
}
