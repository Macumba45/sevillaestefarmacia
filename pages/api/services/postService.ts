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
            const token = req.headers.authorization?.split(' ')[1] // Obtener el token del encabezado de autorización
            const decodedToken = jwt.verify(
                token as string,
                'token'
            ) as JwtPayload // Decodificar el token y especificar el tipo como JwtPayload
            const userId = decodedToken.userId // Obtener el ID del usuario desde el token decodificado
            const user = await findUserById(userId)

            if (!token && user?.role === 'user') {
                res.status(401).json({
                    message: 'No eres el admin del dashboard',
                })
                return
            }
            const service: Services = req.body
            const newService = await createService(service, user?.id as string)
            res.status(200).json(newService)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
