'use client'

import React, { FC, useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { useLogicPayment } from './logic'
import LayoutNavFooter from '@/layout/layout'
import { Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircularIndeterminate from '@/components/Loader'
import { emailConfirmationPaymentService } from '@/services/nodemailer'

interface Props {
    params: {
        paymentId: string
    }
}

const PaymentSuccessComponent: FC<Props> = ({ params }) => {
    const {
        paymentSuccess,
        getPaymentData,
        getPyamentById,
        fecha,
        hour,
        isLoading,
        router,
        user,
        emailConfirmationPaymentCitas,
        setIsLoading,
        titleService,
        getServiceTitle,
        serviceId,
        priceService,
    } = useLogicPayment()
    const [isPaymentProcessed, setIsPaymentProcessed] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getPyamentById(params.paymentId)
        // Verificar si es el servicio especial sin fecha ni hora
        if (serviceId && serviceId === 'clo0e17d30004xy04cjklg2px') {
            setIsPaymentProcessed(true)
            getServiceTitle(serviceId)
            paymentSuccess(params.paymentId)
        } else if (serviceId && serviceId !== 'clo0e17d30004xy04cjklg2px') {
            setIsPaymentProcessed(true)
            getServiceTitle(serviceId)
            getPaymentData(params.paymentId)
            paymentSuccess(params.paymentId)
        }
    }, [serviceId, params])

    useEffect(() => {
        if (isPaymentProcessed && user?.email) {
            if (
                serviceId &&
                titleService &&
                serviceId === 'clo0e17d30004xy04cjklg2px'
            ) {
                // Este es el servicio especial, envía el correo sin datos de fecha y hora
                emailConfirmationPaymentService(
                    user?.email as string,
                    titleService,
                    priceService,
                    user.name as string
                )
                setIsLoading(false)
            } else if (fecha && hour) {
                // Si no es el servicio especial y hay datos de fecha y hora, envía el correo con los datos
                emailConfirmationPaymentCitas(
                    user?.email as string,
                    fecha,
                    hour,
                    user.name as string,
                    priceService,
                    titleService
                )
                setIsLoading(false)
            }
        }
    }, [isPaymentProcessed, user?.email, serviceId, fecha, hour, titleService])

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
