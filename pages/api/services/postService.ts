import { NextApiRequest, NextApiResponse } from 'next'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { findUserById } from '../controllers/user'
import { createService } from '../controllers/services'
import { Services } from '../../../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Método no permitido' })
        return
    }

    try {
        const token = req.headers.authorization?.split(' ')[1]
        const decodedToken = jwt.verify(token as string, 'token') as JwtPayload
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
            serviceDates,
        }: Services = req.body

        if (!Array.isArray(serviceDates)) {
            res.status(400).json({
                message: 'Datos de fechas y horas incorrectos',
            })
            return
        }

        const dates: string[] = serviceDates.map(
            serviceDate => serviceDate.date
        )
        const hours: string[][] = serviceDates.map(
            serviceDate => serviceDate.hours
        )

        const newService = await createService(
            urlPicture,
            urlVideo,
            title,
            descripcion,
            dates,
            hours,
            price,
            user?.id as string
        )

        res.status(200).json(newService)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
