import { NextApiRequest, NextApiResponse } from 'next'
import { findAllUsers } from '../controllers/user'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const users = await findAllUsers()
            res.status(200).json(users)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
