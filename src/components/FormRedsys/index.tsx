import React from 'react'

interface PaymentFormProps {
    form: any // Reemplaza 'any' con el tipo correcto para 'form'
}

const PaymentForm: React.FC<PaymentFormProps> = ({ form }) => {
    return (
        <html>
            <head>
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background-color: #f4f4f4;
                        font-family: Arial, sans-serif;
                    }
                    #paymentForm {
                        display: flex;
                        flex-direction: column;
                    }
                    input[type="submit"] {
                        background-color: #4CAF50;
                        color: white;
                        padding: 14px 20px;
                        margin: 8px 0;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                    input[type="submit"]:hover {
                        background-color: #45a049;
                    }
                `,
                    }}
                />
            </head>
            <body>
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
            </body>
        </html>
    )
}

export default PaymentForm
