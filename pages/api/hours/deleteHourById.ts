import { prisma } from '@/lib/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'DELETE') {
        const { id } = req.body

        try {
            const deletedHour = await prisma.hours.delete({
                where: {
                    id: id as string,
                },
            })

            res.status(200).json(deletedHour)
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete hour' })
        }
    }
}
