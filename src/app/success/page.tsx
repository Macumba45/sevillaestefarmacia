import React from 'react'
import { Box, Button } from '@mui/material'

const PaymentSuccessComponent = () => {
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
