'use client'

import React, { FC, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { useLogicPayment } from './logic'
import LayoutNavFooter from '@/layout/layout'

interface Props {
    params: {
        paymentId: string
    }
}

const PaymentSuccessComponent: FC<Props> = ({ params }) => {
    const { paymentSuccess, getPaymentData } = useLogicPayment()

    useEffect(() => {
        paymentSuccess(params.paymentId)
        getPaymentData(params.paymentId)
    }, [params])

    return (
        <LayoutNavFooter>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <h1>Pago Completado</h1>
                <p>¡Gracias por tu compra!</p>
                <Button href="/" variant="contained" color="primary">
                    Volver a la página principal
                </Button>
            </Box>
        </LayoutNavFooter>
    )
}

export default PaymentSuccessComponent
