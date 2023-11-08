import { NextApiRequest, NextApiResponse } from 'next'
import { updateService } from '../controllers/services'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { findUserById } from '../controllers/user'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'PUT') {
        const transformedDates = req.body.dates.map((dateObj: any) => ({
            date: dateObj.date,
            hours: dateObj.hours.map((hourItem: any) => {
                // Si hourItem es un objeto, extraer la propiedad 'hour', de lo contrario, mantenerlo como está
                return typeof hourItem === 'object' ? hourItem.hour : hourItem
            }),
        }))

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
                id,
                urlVideo,
                urlPicture,
                title,
                subtitle,
                descripcion,
                price,
            } = req.body
            const service = await updateService(
                id as string,
                urlVideo,
                urlPicture,
                title,
                subtitle,
                descripcion,
                transformedDates,
                price
            )
            res.status(200).json(service)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
