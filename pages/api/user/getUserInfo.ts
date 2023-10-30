import { NextApiRequest, NextApiResponse } from 'next'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { findUserById } from '../controllers/user'
import { getPaymentsByUserId } from '../controllers/payments'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const token = req.headers.authorization?.split(' ')[1] // Obtener el token del encabezado de autorización
            if (!token) {
                res.status(401).json({
                    message: 'Se requiere un token de autenticación',
                })
                return
            }
            const decodedToken = jwt.verify(
                token as string,
                'token'
            ) as JwtPayload // Decodificar el token y especificar el tipo como JwtPayload
            const userId = decodedToken.userId // Obtener el ID del usuario desde el token decodificado
            const user = await findUserById(userId)
            const payments = await getPaymentsByUserId(user!.id as string)
            const formattedPayments = payments.map(payment => {
                const title = payment.service.title
                const date = payment.service.dates.find(
                    item => item.id === payment.dateId
                )
                const hour = date ? date.hours : []
                return {
                    title,
                    date: date ? [date.dates] : [], // Agregar la fecha si existe
                    hour: hour
                        .filter(item => item.id === payment.hourId)
                        .map(item => item.hour), // Filtrar las horas que coincidan con el ID de la hora del pago
                    payed: payment.payed,
                }
            })

            if (!user) {
                res.status(404).json({ message: 'No se encontró el usuario' })
                return
            }
            delete user.password
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                phone: user.phone,

                payments: formattedPayments,
            })
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' })
    }
}
