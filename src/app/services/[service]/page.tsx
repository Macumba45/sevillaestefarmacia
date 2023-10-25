'use client'

import { FC, memo, useEffect } from 'react'
import { UserProvider } from '@/context/UserContext'
import CircularIndeterminate from '@/components/Loader'
import { Button, Fab } from '@mui/material'
import Dermo from '@/components/DescriptionServices/dermo'
import Nutricion from '@/components/DescriptionServices/nutricion'
import Laboratorio from '@/components/DescriptionServices/laboratorio'
import Sistema from '@/components/DescriptionServices/sistema'
import Pendientes from '@/components/DescriptionServices/pendientes'
import Mascota from '@/components/DescriptionServices/mascota'
import ModalOrderTime from '@/components/ModalOrderTime'
import { useLogicPageServicesDetail } from './logic'
import HoverMotion from '@/animations/hover'
import AnimatedView from '@/animations/AnimatedContainer'
import {
    ButtonContainerServices,
    Container,
    FloatButtonContainer,
    LoadingContainer,
    Picture,
    PictureContainer,
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
        contactWhatsApp,
        fetchServiceDetails,
        handleOpen,
        handleClose,
        handleReservarCita,
        isLoading,
        open,
        serviceData,
        setHourId,
        onDateIdChange,
    } = useLogicPageServicesDetail()

    useEffect(() => {
        fetchServiceDetails(params.service)
    }, [])

    const getDescriptionByTitle = (serviceId: string) => {
        switch (serviceId) {
            case 'clo0dzomz0001xy04kzkxay49':
                return <Dermo price={serviceData?.price as string} />
            case 'clo0e0a200002xy04bwqml93h':
                return <Nutricion price={serviceData?.price as string} />
            case 'clo0e0mn50003xy040gwqse36':
                return <Laboratorio price={serviceData?.price as string} />
            case 'clo0e17d30004xy04cjklg2px':
                return <Sistema price={serviceData?.price as string} />
            case 'clo0e1e3p0005xy04izx8uzqa':
                return <Pendientes price={serviceData?.price as string} />
            case 'clo0e1q180006xy04pu96nyml':
                return <Mascota price={serviceData?.price as string} />
            default:
                return null
        }
    }

    if (isLoading) {
        return (
            <LoadingContainer>
                <CircularIndeterminate />
            </LoadingContainer>
        )
    }
    return (
        <UserProvider>
            <Container backgrouncolor="#ebf0f6">
                <AnimatedView>
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
                </AnimatedView>
                <AnimatedView>
                    <SubtitleServices>{serviceData?.subtitle}</SubtitleServices>
                </AnimatedView>
                <div
                    style={{
                        display: 'flex',
                    }}
                >
                    {
                        getDescriptionByTitle(
                            serviceData?.id as string
                        ) as JSX.Element
                    }

                    <PictureContainer>
                        <Picture src={serviceData?.urlPicture} />
                    </PictureContainer>
                </div>
                <AnimatedView>
                    <ButtonContainerServices>
                        {serviceData?.id === 'clo0dzomz0001xy04kzkxay49' ||
                        serviceData?.id === 'clo0e0a200002xy04bwqml93h' ||
                        serviceData?.id === 'clo0e1e3p0005xy04izx8uzqa' ? (
                            <HoverMotion>
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
                            </HoverMotion>
                        ) : serviceData?.id === 'clo0e1q180006xy04pu96nyml' ||
                          serviceData?.id === 'clo0e0mn50003xy040gwqse36' ? (
                            <HoverMotion>
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
                                    Solicitar presupuesto
                                </Button>
                            </HoverMotion>
                        ) : (
                            <HoverMotion>
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
                            </HoverMotion>
                        )}
                    </ButtonContainerServices>
                </AnimatedView>
                <FloatButtonContainer>
                    <HoverMotion>
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
                    </HoverMotion>
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
                    onDateIdChange={onDateIdChange}
                />
                <AnimatedView>
                    <VideoYoutubeContainer>
                        <VideoYoutube
                            width="560"
                            height="315"
                            src={serviceData?.urlVideo}
                            title="YouTube video player"
                            allowFullScreen
                        ></VideoYoutube>
                    </VideoYoutubeContainer>
                </AnimatedView>
            </Container>
        </UserProvider>
    )
}

export default memo(Page)
