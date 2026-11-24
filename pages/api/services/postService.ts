import { requireAdmin } from '../../../src/lib/auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { createService } from '../controllers/services'
import { Services } from '../../../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!(await requireAdmin(req, res))) return
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Método no permitido' })
        return
    }

    try {
        const {
            urlPicture,
            urlVideo,
            title,
            subtitle,
            descripcion,
            price,
            dates,
        }: Services = req.body

        if (!Array.isArray(dates)) {
            res.status(400).json({
                message: 'Datos de fechas y horas incorrectos',
            })
            return
        }

        const allDates: string[] = dates.map(
            serviceDate => serviceDate.date as string
        )
        const hours: string[][] = dates.map(
            serviceDate => serviceDate.hours.map(hour => hour.hour ?? '') // Usa ?? para manejar los valores undefined
        )

        const newService = await createService(
            urlPicture,
            urlVideo,
            title,
            subtitle,
            descripcion,
            allDates,
            hours,
            price
        )

        res.status(200).json(newService)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
