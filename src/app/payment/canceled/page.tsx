'use client'

import React, { FC } from 'react'
import { Box, Button } from '@mui/material'
import LayoutNavFooter from '@/layout/layout'

const PaymentSuccessComponent: FC = () => {
    return (
        <LayoutNavFooter>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <h1>Pago Rechazdo</h1>
                <p>
                    Ha habidop un error en la compra, por favor, ponte en
                    contacto con nosotros
                </p>
                <Button href="/" variant="contained" color="primary">
                    Volver a la página principal
                </Button>
            </Box>
        </LayoutNavFooter>
    )
}

export default PaymentSuccessComponent
