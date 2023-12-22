import React, { FC, useEffect, useState } from 'react'
import {
    createRedsysAPI,
    TRANSACTION_TYPES,
    randomTransactionId,
    SANDBOX_URLS,
    CURRENCIES,
} from 'redsys-easy'
import Decimal from 'decimal.js'
import type { Currency } from 'redsys-easy'

interface Props {
    priceId: string
    paymentId: string
    serviceId: string
    userName: string
    priceService: string
}
interface Form {
    url: string
    body: {
        Ds_SignatureVersion: string
        Ds_MerchantParameters: string
        Ds_Signature: string
    }
}
const PaymentComponent: FC<Props> = ({
    priceId,
    paymentId,
    serviceId,
    userName,
    priceService,
}) => {
    const [form, setForm] = useState<Form | null>(null)

    useEffect(() => {
        const { createRedirectForm } = createRedsysAPI({
            urls: SANDBOX_URLS,
            secretKey: 'sq7HjrUOBfKmC576ILgskD5srU870gJ7',
        })

        const merchantInfo = {
            DS_MERCHANT_MERCHANTCODE: '999008881',
            DS_MERCHANT_TERMINAL: '1',
        } as const

        const endpoint = `https://www.sevillaestefarmacia.com/payment/${paymentId}`
        const ednpointCancel =
            'https://www.sevillaestefarmacia.com/payment/canceled'

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
            DS_MERCHANT_MERCHANTNAME: 'Farmacia Sta. Bárbara - Sevilla este',
            DS_MERCHANT_MERCHANTURL: `${endpoint}`,
            DS_MERCHANT_URLOK: `${endpoint}`,
            DS_MERCHANT_URLKO: `${ednpointCancel}`,
        })

        setForm(form)
    }, [priceId, paymentId, serviceId, userName, priceService])

    if (!form) {
        return null
    }

    return (
        <div>
            <div id="root">
                <img
                    src="/images/darkIcon.png"
                    alt="Descripción de la imagen"
                />
                <h1 id="farmacia">Farmacia Sta.Bárbara</h1>
            </div>
            <form id="paymentForm" action={form.url} method="post">
                <input
                    type="hidden"
                    id="Ds_SignatureVersion"
                    name="Ds_SignatureVersion"
                    value={form.body.Ds_SignatureVersion}
                />
                <input
                    type="hidden"
                    id="Ds_MerchantParameters"
                    name="Ds_MerchantParameters"
                    value={form.body.Ds_MerchantParameters}
                />
                <input
                    type="hidden"
                    id="Ds_Signature"
                    name="Ds_Signature"
                    value={form.body.Ds_Signature}
                />
                <input type="submit" value="Pagar con tarjeta de crédito" />
            </form>
        </div>
    )
}

export default PaymentComponent
