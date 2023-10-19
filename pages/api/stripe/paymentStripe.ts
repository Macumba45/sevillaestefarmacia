import { NextApiRequest, NextApiResponse } from 'next'
import { createPayment } from '../controllers/stripe'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { userId, serviceId, dateId, hourId } = req.body
        const newPayment = await createPayment(
            userId,
            serviceId,
            dateId,
            hourId
        )
        res.status(200).json(newPayment)
    } catch (error) {}
}
