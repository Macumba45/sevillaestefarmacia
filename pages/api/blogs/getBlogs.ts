import { NextApiRequest, NextApiResponse } from 'next'
import { getBlogs } from '../controllers/blogs'
import { Blogs } from '../../../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Blogs[] | { message: string }>
) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Método no permitido' })
        return
    }

    try {
        const blogs = await getBlogs()
        res.status(200).json(blogs)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los blogs' })
    }
}
