'use client'

import React, { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import LayoutNavFooter from '@/layout/layout'
import CancelIcon from '@mui/icons-material/Cancel'

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
                <Typography
                    variant="h6"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'red',
                        marginBottom: '20px',
                        width: 300,
                        textAlign: 'center',
                    }}
                >
                    Ha habido un error en el pago. Por favor, ponte en contacto
                    con nuestro equipo.
                </Typography>
                <CancelIcon
                    sx={{
                        marginLeft: '10px',
                        color: 'red',
                        marginBottom: '20px',
                        fontSize: '50px',
                    }}
                />
                <Button
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        marginTop: '20px',
                        ':hover': {
                            backgroundColor: 'white',
                            color: 'black',
                        },
                    }}
                    href="/"
                    variant="contained"
                    color="primary"
                >
                    Volver a la página principal
                </Button>
            </Box>
        </LayoutNavFooter>
    )
}

export default PaymentSuccessComponent
