import { NextApiRequest, NextApiResponse } from 'next'
import { createRedsysAPI, PRODUCTION_URLS, isResponseCodeOk } from 'redsys-easy'
import { makePaymentTrue } from '../controllers/payments'

// Recibe la notificación firmada de Redsys (POST del banco) o los mismos
// parámetros que Redsys añade a la URL de éxito (los reenvía la página /payment/[id]).
// Solo marca el pago si la firma es válida y el banco lo ha autorizado.
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Método no permitido' })
        return
    }
    try {
        const { processRestNotification } = createRedsysAPI({
            urls: PRODUCTION_URLS,
            secretKey: process.env.secretKey as string,
        })
        const { Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature } =
            req.body
        const params = processRestNotification({
            Ds_SignatureVersion,
            Ds_MerchantParameters,
            Ds_Signature,
        })

        const paymentId = params.Ds_MerchantData
        if (!paymentId || !isResponseCodeOk(params.Ds_Response)) {
            res.status(200).json({ payed: false })
            return
        }

        await makePaymentTrue(paymentId)
        res.status(200).json({ payed: true })
    } catch (error: any) {
        console.error('Notificación Redsys inválida:', error.message)
        res.status(400).json({ message: 'Notificación no válida' })
    }
}
