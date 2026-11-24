import { requireUser } from '../../../src/lib/auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { createPayment } from '../controllers/stripe'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const authUser = await requireUser(req, res)
    if (!authUser) return
    try {
        const { serviceId, dateId, hourId } = req.body
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
