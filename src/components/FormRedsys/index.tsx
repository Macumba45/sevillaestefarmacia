import React, { FC, useEffect } from 'react'

interface Props {
    form: any
    orderId: string
    priceService: string
    currency: string
}

const PaymentForm: FC<Props> = ({ form, orderId, priceService, currency }) => {
    useEffect(() => {
        ;(document.getElementById('paymentForm') as HTMLFormElement).submit()
    }, [])

    return (
        <div>
            <p>
                Payment for order {orderId}, {priceService} {currency}
            </p>
            <form
                id="paymentForm"
                action={form.url}
                method="post"
                target="_blank"
            >
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
                <input type="submit" value="Pay with credit card" />
            </form>
        </div>
    )
}

export default PaymentForm
