import { NextApiRequest, NextApiResponse } from 'next'
import { updateService } from '../controllers/services'

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
        // Dentro de tu función handler antes de llamar a updateService

        try {
            const { id, urlVideo, urlPicture, title, descripcion, price } =
                req.body
            const service = await updateService(
                id as string,
                urlVideo,
                urlPicture,
                title,
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
