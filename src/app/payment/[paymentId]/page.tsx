'use client'

import React, { FC, useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { useLogicPayment } from './logic'
import LayoutNavFooter from '@/layout/layout'
import { Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircularIndeterminate from '@/components/Loader'

interface Props {
    params: {
        paymentId: string
    }
}

const PaymentSuccessComponent: FC<Props> = ({ params }) => {
    const {
        paymentSuccess,
        getPaymentData,
        getChargeList,
        paymentIdMetadata,
        getPyamentById,
        fecha,
        hour,
        isLoading,
        router,
        user,
        emailConfirmationPayment,
    } = useLogicPayment()
    const [isPaymentProcessed, setIsPaymentProcessed] = useState(false)

    useEffect(() => {
        getChargeList(params.paymentId)
        getPyamentById(params.paymentId)
    }, [params])

    useEffect(() => {
        if (paymentIdMetadata.includes(params.paymentId)) {
            paymentSuccess(params.paymentId)
            setIsPaymentProcessed(true)
            getPaymentData(params.paymentId)
        }
    }, [params, paymentIdMetadata])

    useEffect(() => {
        if (isPaymentProcessed && user?.email && fecha && hour) {
            emailConfirmationPayment(user?.email as string, fecha, hour)
        }
    }, [isPaymentProcessed, fecha, hour])

    if (isLoading)
        return (
            <LayoutNavFooter>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <CircularIndeterminate />
                </div>
            </LayoutNavFooter>
        )

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
                    <CheckCircleIcon
                        sx={{
                            marginLeft: '10px',
                            color: 'green',
                            marginBottom: '20px',
                            fontSize: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    />
                </Typography>
                <Typography
                    variant="h5"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'black',
                        marginLeft: '2rem',
                        marginRight: '2rem',
                        textAlign: 'center',
                    }}
                >
                    Tu reserva el día: {fecha} <br /> a las {hour} ha sido
                    completada con éxito
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'black',
                        margin: '1rem',
                        textAlign: 'center',
                        fontWeight: 300,
                    }}
                >
                    Si deseas cambiar la cita, porfavor, ponte en contacto con
                    nosotros.
                </Typography>

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
