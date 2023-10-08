import { NextApiRequest, NextApiResponse } from 'next'
import { findUserById } from '../controllers/user'
import { createService } from '../controllers/services'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Services } from '../../../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const token = req.headers.authorization?.split(' ')[1]
            const decodedToken = jwt.verify(
                token as string,
                'token'
            ) as JwtPayload
            const userId = decodedToken.userId
            const user = await findUserById(userId)

            if (!token && user?.role === 'user') {
                res.status(401).json({
                    message: 'No eres el admin del dashboard',
                })
                return
            }
            const {
                urlPicture,
                urlVideo,
                title,
                descripcion,
                price,
            }: Services = req.body
            const dates: string[] = req.body.dates
            console.log(dates)
            const newService = await createService(
                urlPicture,
                urlVideo,
                title,
                descripcion,
                dates,
                price,
                user?.id as string
            )
            console.log(newService)
            res.status(200).json(newService)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
