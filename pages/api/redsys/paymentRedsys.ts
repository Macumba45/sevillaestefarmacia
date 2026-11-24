import { requireUser } from '../../../src/lib/auth'
import {
    createRedsysAPI,
    TRANSACTION_TYPES,
    randomTransactionId,
    PRODUCTION_URLS,
    CURRENCIES,
} from 'redsys-easy'
import Decimal from 'decimal.js'
import type { Currency } from 'redsys-easy'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../src/lib/client'
import dotenv from 'dotenv'
dotenv.config()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const authUser = await requireUser(req, res)
    if (!authUser) return
    if (req.method === 'POST') {
        try {
            const paymentId = req.body.paymentId as string
            // El precio sale de la BD, nunca del navegador
            const payment = await prisma.payments.findUnique({
                where: { id: paymentId },
                include: { service: true },
            })
            if (!payment || payment.userId !== authUser.id || payment.payed) {
                res.status(400).json({ message: 'Pago no válido' })
                return
            }
            const priceService = payment.service.price

            const { createRedirectForm } = createRedsysAPI({
                urls: PRODUCTION_URLS,
                secretKey: process.env.secretKey as string,
            })

            const merchantInfo = {
                DS_MERCHANT_MERCHANTCODE: '353608151',
                DS_MERCHANT_TERMINAL: '001',
            } as const

            const endpoint = `https://www.sevillaestefarmacia.com/payment/${paymentId}`
            const ednpointCancel =
                'https://www.sevillaestefarmacia.com/payment/canceled'

            
            const currency = 'EUR' as Currency
            const orderId = randomTransactionId()
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
                DS_MERCHANT_MERCHANTNAME:
                    'Farmacia Sta. Bárbara - Sevilla este',
                DS_MERCHANT_MERCHANTURL:
                    'https://www.sevillaestefarmacia.com/api/redsys/notification',
                DS_MERCHANT_MERCHANTDATA: paymentId,
                DS_MERCHANT_URLOK: `${endpoint}`,
                DS_MERCHANT_URLKO: `${ednpointCancel}`,
            })

            const html = [
                '<!DOCTYPE html>',
                '<html>',
                '<head>',
                '<style>',
                'body {',
                '  display: flex;',
                '  justify-content: center;',
                '  flex-direction: column;',
                '  align-items: center;',
                '  height: 100vh;',
                '  margin: 0;',
                '  background-color: #f4f4f4;',
                '  font-family: Arial, sans-serif;',
                '}',
                '#paymentForm {',
                '  display: flex;',
                '  flex-direction: column;',
                '}',
                '#root {',
                '  display: flex;',
                '  justify-content: center;',
                '  flex-direction: column;',
                '  align-items: center;',
                'margin-bottom: 5rem;',
                '}',
                '#farmacia {',
                '  font-size: 2rem;',
                '  color: #000000;',
                'margin-top: 2rem;',
                '}',
                'input[type="submit"] {',
                '  background-color: #000000;',
                '  color: white;',
                '  padding: 14px 20px;',
                '  margin: 8px 0;',
                '  border: none;',
                '  border-radius: 4px;',
                '  cursor: pointer;',
                '}',
                'input[type="submit"]:hover {',
                '  background-color: #000000;',
                '}',
                '</style>',
                '</head>',
                '<body>',
                '<div id="root">',
                ' <img src="/images/darkIcon.png" alt="Descripción de la imagen">',
                ' <h1 id="farmacia">Farmacia Sta.Bárbara</h1>',
                '</div>',
                `<form id="paymentForm" action="${form.url}" method="post">`,
                `  <input type="hidden" id="Ds_SignatureVersion" name="Ds_SignatureVersion" value="${form.body.Ds_SignatureVersion}" />`,
                `  <input type="hidden" id="Ds_MerchantParameters" name="Ds_MerchantParameters" value="${form.body.Ds_MerchantParameters}" />`,
                `  <input type="hidden" id="Ds_Signature" name="Ds_Signature" value="${form.body.Ds_Signature}"/>`,
                '  <input type="submit" value="Pagar con tarjeta de crédito" />',
                '</form>',
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
