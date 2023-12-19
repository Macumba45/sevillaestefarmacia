import {
    createRedsysAPI,
    TRANSACTION_TYPES,
    randomTransactionId,
    SANDBOX_URLS,
    CURRENCIES,
} from 'redsys-easy'
import Decimal from 'decimal.js'
import type { Currency } from 'redsys-easy'
import { NextApiRequest, NextApiResponse } from 'next'
import { renderToString } from 'react-dom/server'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            const priceId = req.body.priceId
            const paymentId = req.body.paymentId
            const serviceId = req.body.serviceId
            const userName = req.body.userName
            const priceService = req.body.priceService
            console.log(priceId, paymentId, serviceId, userName, priceService)

            const { createRedirectForm } = createRedsysAPI({
                urls: SANDBOX_URLS,
                secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
            })

            const merchantInfo = {
                DS_MERCHANT_MERCHANTCODE: '999008881',
                DS_MERCHANT_TERMINAL: '1',
            } as const

            const endpoint = `http://localhost:3000/payment/${paymentId}`

            const successRedirectPath = '/success'
            const errorRedirectPath = '/error'
            const notificationPath = '/api/notification'

            const currency = 'EUR' as Currency

            const orderId = paymentId
            const currencyInfo = CURRENCIES[currency]

            // Convert 49.99€ -> 4999
            const redsysAmount = new Decimal(priceService)
                .mul(Math.pow(10, currencyInfo.decimals))
                .round()
                .toFixed(0)
            // Convert EUR -> 978
            const redsysCurrency = currencyInfo.num

            const form = createRedirectForm({
                ...merchantInfo,
                DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPES.AUTHORIZATION, // '0'
                DS_MERCHANT_ORDER: orderId,
                // amount in smallest currency unit(cents)
                DS_MERCHANT_AMOUNT: redsysAmount,
                DS_MERCHANT_CURRENCY: redsysCurrency,
                DS_MERCHANT_MERCHANTNAME: 'MI COMERCIO',
                DS_MERCHANT_MERCHANTURL: `${endpoint}${notificationPath}`,
                DS_MERCHANT_URLOK: `${endpoint}`,
                DS_MERCHANT_URLKO: `${endpoint}${errorRedirectPath}`,
            })

            const html = [
                '<!DOCTYPE html>',
                '<html>',
                '<body>',
                `<p>Payment for order ${orderId}, ${priceService} ${currency}</p>`,
                `<form id="paymentForm" action="${form.url}" method="post" target="_blank">`,
                `  <input type="hidden" id="Ds_SignatureVersion" name="Ds_SignatureVersion" value="${form.body.Ds_SignatureVersion}" />`,
                `  <input type="hidden" id="Ds_MerchantParameters" name="Ds_MerchantParameters" value="${form.body.Ds_MerchantParameters}" />`,
                `  <input type="hidden" id="Ds_Signature" name="Ds_Signature" value="${form.body.Ds_Signature}"/>`,
                '  <input type="submit" value="Pay with credit card" />',
                '</form>',
                '<script>',
                '  window.onload = function() {',
                '    document.getElementById("paymentForm").submit();',
                '  };',
                '</script>',
                '</body>',
                '</html>',
            ].join('\n')

            // Redirige al cliente a la página de pago
            res.setHeader('Content-Type', 'text/html')
            res.status(200).send(html)
        } catch (err: any) {
            res.status(err.statusCode || 500).json(err.message)
        }
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method Not Allowed')
    }
}
