import { NextApiRequest, NextApiResponse } from 'next'
import { deleteBlog } from '../controllers/blogs'
import { Blogs } from '../../../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Blogs | { message: string }>
) {
    if (req.method !== 'DELETE') {
        res.status(405).json({ message: 'Método no permitido' })
        return
    }

    try {
        const { id } = req.body
        await deleteBlog(id as string)
        res.status(200).json({ message: 'Blog eliminado con  exito' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el taller' })
    }
}
