'use client'

import { FC, memo, useEffect } from 'react'
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
    Picture,
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
    console.log('serviceData?.title', serviceData)
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
            <Picture src={serviceData?.urlPicture} />
            <ButtonContainerServices>
                {serviceData?.id === 'clo0dzomz0001xy04kzkxay49' ||
                serviceData?.id === 'clo0e0a200002xy04bwqml93h' ||
                serviceData?.id === 'clo0e1e3p0005xy04izx8uzqa' ? (
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
                ) : serviceData?.id === 'clo0e1q180006xy04pu96nyml' ? (
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
                isLoading={isLoading}
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
