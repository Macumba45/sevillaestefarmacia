'use client'

import React, { FC, useEffect } from 'react'
import { Box, Button } from '@mui/material'

interface Props {
    params: {
        paymentId: string
    }
}

const PaymentSuccessComponent: FC<Props> = ({ params }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <h1>Pago Rechazdo</h1>
            <p>
                Ha habidop un error en la compra, por favor, ponte en contacto
                con nosotros
            </p>
            <Button href="/" variant="contained" color="primary">
                Volver a la página principal
            </Button>
        </Box>
    )
}

export default PaymentSuccessComponent
