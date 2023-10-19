'use client'

import { FC, memo, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLogicHome } from '@/app/logic'
import ResponsiveAppBar from '@/components/MenuNavBar'
import CircularIndeterminate from '@/components/Loader'
import { Button, Fab } from '@mui/material'
import DermoDescription from '@/components/DescriptionServices/dermo'
import ModalOrderTime from '@/components/ModalOrderTime'
import { useLogicPageServicesDetail } from './logic'
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
        logOut,
        router,
    } = useLogicHome()

    const {
        contactWhatsApp,
        fetchServiceDetails,
        handleOpen,
        handleClose,
        handleReservarCita,
        isLoading,
        open,
        serviceData,
        setHourId,
        setDateId,
    } = useLogicPageServicesDetail()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const { history } = window
            const originalTitle = serviceData?.title // Título original con espacios
            if (originalTitle) {
                const newTitle = originalTitle.replace(/\s/g, '-')
                const newURL = `/services/${encodeURIComponent(newTitle)}` // Codificar el título para manejar caracteres especiales
                history.pushState(null, '', newURL)
            }
        }
    }, [serviceData?.title])

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
        <Container backgrouncolor="#ebf0f6">
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
                        ? '600px'
                        : '500px'
                }
            >
                {serviceData?.title}
            </TitleServices>
            <SubtitleServices>{serviceData?.subtitle}</SubtitleServices>
            <DermoDescription price={serviceData?.price as string} />
            <ButtonContainerServices>
                {serviceData?.id === 'clnsx96ds0001xyyk7teubf6m' ||
                serviceData?.id === 'clnsxjnf80003xyyk3quxzg92' ||
                serviceData?.id === 'clnsxkxrs0009xyykmj8au8sd' ? (
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
                        Reservar cita
                    </Button>
                ) : serviceData?.id === 'clnsxldjk000bxyykec5uspw6' ? (
                    <Button
                        onClick={contactWhatsApp} // La función que maneja el chat de WhatsApp
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
                        Chatear por WhatsApp
                    </Button>
                ) : (
                    <Button
                        onClick={handleReservarCita}
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
                        Pagar el servicio
                    </Button>
                )}
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
            <ModalOrderTime
                dates={serviceData?.dates}
                handleClose={handleClose}
                open={open}
                handleReservarCita={handleReservarCita}
                onHourIdChange={newHourId => {
                    setHourId(newHourId)
                }}
                onDateIdChange={newDateIr => {
                    setDateId(newDateIr)
                }} // Maneja el cambio en selectDate
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
