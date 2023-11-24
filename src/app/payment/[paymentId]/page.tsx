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
        getChargeList,
        paymentIdMetadata,
        getPyamentById,
        fecha,
        hour,
        isLoading,
        router,
        user,
        emailConfirmationPaymentCitas,
        serviceIdMetadata,
        setIsLoading,
        titleService,
        getServiceTitle,
        userNameMetaData,
        priceServiceMetaData,
    } = useLogicPayment()
    const [isPaymentProcessed, setIsPaymentProcessed] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getChargeList(params.paymentId)
    }, [params])

    useEffect(() => {
        // Verificar si es el servicio especial sin fecha ni hora
        if (
            serviceIdMetadata &&
            serviceIdMetadata === 'clo0e17d30004xy04cjklg2px'
        ) {
            setIsPaymentProcessed(true)
            getServiceTitle(serviceIdMetadata)
        } else if (
            serviceIdMetadata &&
            serviceIdMetadata !== 'clo0e17d30004xy04cjklg2px'
        ) {
            getPyamentById(params.paymentId)
            getServiceTitle(serviceIdMetadata)
        }
    }, [serviceIdMetadata])

    useEffect(() => {
        if (paymentIdMetadata.includes(params.paymentId)) {
            paymentSuccess(params.paymentId)
            setIsPaymentProcessed(true)
            getPaymentData(params.paymentId)
        }
    }, [params, paymentIdMetadata])

    useEffect(() => {
        if (isPaymentProcessed && user?.email) {
            if (
                serviceIdMetadata &&
                titleService &&
                serviceIdMetadata === 'clo0e17d30004xy04cjklg2px'
            ) {
                // Este es el servicio especial, envía el correo sin datos de fecha y hora
                emailConfirmationPaymentService(
                    user?.email as string,
                    titleService
                )
                setIsLoading(false)
            } else if (fecha && hour) {
                // Si no es el servicio especial y hay datos de fecha y hora, envía el correo con los datos
                emailConfirmationPaymentCitas(
                    user?.email as string,
                    fecha,
                    hour,
                    userNameMetaData,
                    priceServiceMetaData,
                    titleService
                )
                setIsLoading(false)
            }
        }
    }, [
        isPaymentProcessed,
        user?.email,
        serviceIdMetadata,
        fecha,
        hour,
        titleService,
        userNameMetaData,
        priceServiceMetaData,
    ])

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
                    {serviceIdMetadata &&
                    serviceIdMetadata === 'clo0e17d30004xy04cjklg2px' ? (
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
                    {serviceIdMetadata &&
                    serviceIdMetadata === 'clo0e17d30004xy04cjklg2px' ? (
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
