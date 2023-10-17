'use client'

import { FC, memo, useEffect, useState } from 'react'
import { useLogicHome } from '@/app/logic'
import ResponsiveAppBar from '@/components/MenuNavBar'
import CircularIndeterminate from '@/components/Loader'
import { Button, Fab } from '@mui/material'
import DermoDescription from '@/components/DescriptionServices/dermo'
import OrderServicesDate from '@/components/ModalOrderTime'
import { stripePayment } from '@/services/stripe'
import {
    ButtonContainerServices,
    Container,
    FloatButtonContainer,
    LoadingContainer,
    NavContainer,
    SubtitleServices,
    TitleServices,
    VideoYoutube,
    VideoYoutubeContainer,
} from './styles'

interface Props {
    params: {
        service: string
    }
}

const Page: FC<Props> = ({ params }) => {
    const {
        serviceData,
        buttonName,
        closeDrawer,
        closeDrawerButton,
        currentUser,
        getUserInfoDetails,
        handleButtonClick,
        handleCloseNavMenu,
        handleOpenNavMenu,
        isDrawerOpen,
        isDrawerOpenButton,
        isLoading,
        logOut,
        router,
        fetchServiceDetails,
    } = useLogicHome()

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const contactWhatsApp = () => {
        const phoneNumber = '+34682296561'
        const message = `Hola Farmacia Santa Bárbara, me gustaría solicitar información sobre el servicio ${serviceData?.title}`

        const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
            message
        )}`

        window.open(whatsappURL)
    }

    const handleReservarCita = async () => {
        try {
            // Llama a la función stripePayment para crear una sesión de pago
            const sessionData = await stripePayment(
                1,
                'price_1O2DaNL8xRKNThtRM1vOjXKH'
            )
            router.push(sessionData.url)
        } catch (error) {
            console.error('Error al crear la sesión de pago: ', error)
        }
    }

    useEffect(() => {
        getUserInfoDetails()
        fetchServiceDetails(params.service)
    }, [])

    if (isLoading) {
        return (
            <LoadingContainer>
                <CircularIndeterminate />
            </LoadingContainer>
        )
    }

    return (
        <Container>
            <NavContainer>
                <ResponsiveAppBar
                    closeDrawer={() => closeDrawer()}
                    handleButtonClick={() => handleButtonClick()}
                    handleCloseNavMenu={() => handleCloseNavMenu()}
                    handleOpenNavMenu={() => handleOpenNavMenu()}
                    closeDrawerButton={() => closeDrawerButton()}
                    isDrawerOpenButton={isDrawerOpenButton}
                    isDrawerOpen={isDrawerOpen}
                    buttonName={buttonName}
                    onLogOut={() => logOut()}
                    userRole={currentUser}
                />
            </NavContainer>

            <TitleServices
                widthtitle="320px"
                widthtitledesktop={
                    serviceData?.title ===
                    'SISTEMA PERSONALIZADO DE DOSIFICACIÓN'
                        ? '600px' // Ancho personalizado si el título coincide
                        : '500px' // Ancho predeterminado para otros títulos de escritorio
                }
            >
                {serviceData?.title}
            </TitleServices>
            <SubtitleServices>{serviceData?.subtitle}</SubtitleServices>
            <DermoDescription price={serviceData?.price as string} />
            <ButtonContainerServices>
                <Button
                    onClick={handleOpen}
                    variant="outlined"
                    sx={{
                        color: 'white',
                        borderColor: 'black',
                        width: '300px',
                        borderRadius: '130px',
                        backgroundColor: 'black',
                        ':hover': {
                            backgroundColor: 'white',
                            color: 'black',
                            borderColor: 'black',
                        },
                        fontFamily: 'Cormorant Garamond',
                    }}
                >
                    Solicitar cita
                </Button>
            </ButtonContainerServices>
            <FloatButtonContainer>
                <Fab
                    onClick={contactWhatsApp}
                    sx={{
                        color: 'white',
                        borderColor: 'black',
                        width: '100%',
                        borderRadius: '130px',
                        backgroundColor: 'black',
                        ':hover': {
                            backgroundColor: 'white',
                            color: 'black',
                            borderColor: 'black',
                        },
                        fontFamily: 'Cormorant Garamond',
                    }}
                    variant="extended"
                >
                    ¿Te asesoramos?
                </Fab>
            </FloatButtonContainer>
            <OrderServicesDate
                dates={
                    serviceData?.dates?.map(date => ({
                        dates: date.date,
                        hours: date.hours,
                    })) || []
                }
                handleClose={handleClose}
                open={open}
                handleReservarCita={handleReservarCita}
            />
            <VideoYoutubeContainer>
                <VideoYoutube
                    width="560"
                    height="315"
                    src={serviceData?.urlVideo}
                    title="YouTube video player"
                    allowFullScreen
                ></VideoYoutube>
            </VideoYoutubeContainer>
        </Container>
    )
}

export default memo(Page)
