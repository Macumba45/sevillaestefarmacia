'use client'

import React, { FC, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { useLogicPayment } from './logic'
import LayoutNavFooter from '@/layout/layout'
import { Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

interface Props {
    params: {
        paymentId: string
    }
}

const PaymentSuccessComponent: FC<Props> = ({ params }) => {
    const { paymentSuccess, getPaymentData, getChargeList, paymentIdMetadata } =
        useLogicPayment()

    useEffect(() => {
        getChargeList(params.paymentId)
    }, [params])

    useEffect(() => {
        if (paymentIdMetadata.includes(params.paymentId)) {
            paymentSuccess(params.paymentId)
            getPaymentData(params.paymentId)
        }
    }, [params, paymentIdMetadata])

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
                    variant="h5"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'green',
                        marginBottom: '20px',
                    }}
                >
                    Pago Completado
                </Typography>
                <CheckCircleIcon
                    sx={{
                        marginLeft: '10px',
                        color: 'green',
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
