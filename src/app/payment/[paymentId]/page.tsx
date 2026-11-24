'use client'

import React, { FC } from 'react'
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
    const { isLoading, payed, serviceId, fecha, hour } = useLogicPayment(
        params.paymentId
    )

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

    if (!payed)
        return (
            <LayoutNavFooter>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="100vh"
                    textAlign="center"
                    padding="2rem"
                >
                    <Typography variant="h5">
                        Tu pago está pendiente de confirmar por el banco. Te
                        llegará un email de confirmación en cuanto se complete.
                    </Typography>
                </Box>
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
                    {serviceId && serviceId === 'clo0e17d30004xy04cjklg2px' ? (
                        <p>Tu compra ha sido completada con éxito</p>
                    ) : (
                        <>
                            Tu reserva el día: {fecha} <br /> a las {hour} ha
                            sido completada con éxito
                        </>
                    )}
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
                    {serviceId && serviceId === 'clo0e17d30004xy04cjklg2px' ? (
                        <p>
                            Por favor, presenta el email de confirmación de
                            compra en el mostrador
                        </p>
                    ) : (
                        <p>
                            Si deseas cambiar la cita, por favor, ponte en
                            contacto con nosotros.
                        </p>
                    )}
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
