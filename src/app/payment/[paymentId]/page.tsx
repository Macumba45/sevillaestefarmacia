'use client'

import React, { FC, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { useLogicPayment } from './logic'

interface Props {
    params: {
        paymentId: string
    }
}

const PaymentSuccessComponent: FC<Props> = ({ params }) => {
    const { paymentSuccess } = useLogicPayment()

    useEffect(() => {
        paymentSuccess(params.paymentId)
    }, [])

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <h1>Pago Completado</h1>
            <p>¡Gracias por tu compra!</p>
            <Button variant="contained" color="primary">
                Volver a la página principal
            </Button>
        </Box>
    )
}

export default PaymentSuccessComponent
