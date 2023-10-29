'use client'

import { FC, memo, useContext, useEffect } from 'react'
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
import LayoutNavFooter from '@/layout/layout'
import {
    ButtonContainerServices,
    Container,
    FloatButtonContainer,
    FloatButtonLoginContainer,
    LoadingContainer,
    Picture,
    PictureContainer,
    SubtitleServices,
    TitleServices,
    VideoYoutube,
    VideoYoutubeContainer,
} from './styles'
import { UserContext } from '@/context/UserContext'
import FloatLoginButton from '@/components/FloatLoginButton'

interface Props {
    params: {
        service: string
    }
}

const Page: FC<Props> = ({ params }) => {
    const { user } = useContext(UserContext)

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
        goToLogin,
    } = useLogicPageServicesDetail()

    useEffect(() => {
        fetchServiceDetails(params.service)
    }, [])

    const getDescriptionById = (serviceId: string) => {
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

    let backgroundcolor: string
    let buttonName: string
    let isButtonDisabled = false

    switch (serviceData?.id) {
        case 'clo0dzomz0001xy04kzkxay49':
            backgroundcolor = '#ebf0f6'
            buttonName = 'Reservar cita'
            break
        case 'clo0e0a200002xy04bwqml93h':
            backgroundcolor = '#F6F6EB'
            buttonName = 'Reservar cita'
            break
        case 'clo0e0mn50003xy040gwqse36':
            backgroundcolor = '#ebf0f6'
            buttonName = 'Solcitar presupuesto'
            break
        case 'clo0e17d30004xy04cjklg2px':
            backgroundcolor = '#F6F6EB'
            buttonName = 'Pagar el servicio'
            break
        case 'clo0e1e3p0005xy04izx8uzqa':
            backgroundcolor = '#ebf0f6'
            buttonName = 'Reservar cita'
            break
        case 'clo0e1q180006xy04pu96nyml':
            backgroundcolor = '#F6F6EB'
            buttonName = 'Contacta'
            break
        default:
            backgroundcolor = '#ebf0f6'
            buttonName = 'Reservar cita'
    }

    // Si no hay usuario y el servicio requiere una cita, deshabilita el botón.
    if (
        !user &&
        (serviceData?.id === 'clo0dzomz0001xy04kzkxay49' ||
            serviceData?.id === 'clo0e0a200002xy04bwqml93h' ||
            serviceData?.id === 'clo0e1e3p0005xy04izx8uzqa')
    ) {
        isButtonDisabled = true
        buttonName = 'Inicia sesión para reservar cita'
    }

    if (!serviceData) {
        return (
            <LayoutNavFooter>
                <LoadingContainer>
                    <CircularIndeterminate />
                </LoadingContainer>
            </LayoutNavFooter>
        )
    }

    return (
        <LayoutNavFooter>
            <Container backgroundcolor={backgroundcolor}>
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
                <AnimatedView>
                    <div
                        style={{
                            display: 'flex',
                        }}
                    >
                        {
                            getDescriptionById(
                                serviceData?.id as string
                            ) as JSX.Element
                        }

                        <PictureContainer>
                            <Picture src={serviceData?.urlPicture} />
                        </PictureContainer>
                    </div>
                </AnimatedView>
                <ButtonContainerServices>
                    <HoverMotion>
                        <Button
                            disabled={isButtonDisabled}
                            onClick={() => {
                                if (buttonName === 'Reservar cita') {
                                    handleOpen()
                                } else if (buttonName === 'Pagar el servicio') {
                                    handleReservarCita()
                                } else if (buttonName === 'Contacta') {
                                    contactWhatsApp()
                                } else if (
                                    buttonName === 'Solcitar presupuesto'
                                ) {
                                    contactWhatsApp()
                                } else if (
                                    buttonName ===
                                    'Inicia sesión para reservar cita'
                                ) {
                                    contactWhatsApp()
                                }
                            }}
                            variant="outlined"
                            sx={{
                                color: 'white',
                                borderColor: 'black',
                                width: '300px',
                                borderRadius: '130px',
                                backgroundColor: isButtonDisabled
                                    ? '#e0e0e0'
                                    : 'black',
                                ':hover': {
                                    backgroundColor: 'white',
                                    color: 'black',
                                    borderColor: 'black',
                                },
                                fontFamily: 'Cormorant Garamond',
                            }}
                        >
                            {buttonName}
                        </Button>
                    </HoverMotion>
                </ButtonContainerServices>
                <FloatButtonContainer>
                    <HoverMotion>
                        <Fab
                            onClick={contactWhatsApp}
                            sx={{
                                color: 'white',
                                borderColor: 'black',
                                width: '160px',
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
                    isEditing={false}
                />
                <VideoYoutubeContainer>
                    <VideoYoutube
                        style={{
                            display: serviceData?.urlVideo ? 'block' : 'none',
                        }}
                        width="560"
                        height="315"
                        src={serviceData?.urlVideo}
                        title="YouTube video player"
                        allowFullScreen
                    ></VideoYoutube>
                </VideoYoutubeContainer>
                <FloatButtonLoginContainer>
                    <HoverMotion>
                        <FloatLoginButton
                            title="Iniciar Sesión"
                            onClick={() => {
                                goToLogin()
                            }}
                            style={{
                                display: isButtonDisabled ? 'flex' : 'none',
                            }}
                        />
                    </HoverMotion>
                </FloatButtonLoginContainer>
            </Container>
        </LayoutNavFooter>
    )
}

export default memo(Page)
