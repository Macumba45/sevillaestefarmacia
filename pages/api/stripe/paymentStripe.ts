import { requireUser } from '../../../src/lib/auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { createPayment } from '../controllers/stripe'
import { prisma } from '../../../src/lib/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const authUser = await requireUser(req, res)
    if (!authUser) return
    try {
        const { serviceId, dateId, hourId } = req.body
        // La hora debe pertenecer a esa fecha y servicio, y estar libre
        if (hourId) {
            const hour = await prisma.hours.findUnique({
                where: { id: hourId },
                include: { date: true },
            })
            if (
                !hour ||
                hour.isBooked ||
                hour.dateId !== dateId ||
                hour.date.serviceId !== serviceId
            ) {
                res.status(400).json({ message: 'Hora no disponible' })
                return
            }
        }
        const newPayment = await createPayment(
            authUser.id,
            serviceId,
            dateId,
            hourId
        )
        res.status(200).json(newPayment)
    } catch (error) {
        res.status(400).json({ message: "No se pudo crear el pago" })
    }
}
