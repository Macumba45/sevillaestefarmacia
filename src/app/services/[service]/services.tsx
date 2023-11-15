'use client'

import { FC, memo, useContext, useEffect } from 'react'
import { UserContext } from '@/context/UserContext'
import { getAuthenticatedToken } from '../../../../storage/storage'
import { useLogicPageServicesDetail } from './logic'
import { Button, Fab } from '@mui/material'
import CircularIndeterminate from '@/components/Loader'
import FloatLoginButton from '@/components/FloatLoginButton'
import Dermo from '@/components/DescriptionServices/dermo'
import Nutricion from '@/components/DescriptionServices/nutricion'
import Laboratorio from '@/components/DescriptionServices/laboratorio'
import Sistema from '@/components/DescriptionServices/sistema'
import Pendientes from '@/components/DescriptionServices/pendientes'
import Mascota from '@/components/DescriptionServices/mascota'
import ModalOrderTime from '@/components/ModalOrderTime'
import HoverMotion from '@/animations/hover'
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
        fetchServiceDetails(params?.service)
    }, [params])

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
    let isButtonDisabled: boolean

    switch (serviceData?.id) {
        case 'clo0dzomz0001xy04kzkxay49':
            backgroundcolor = '#ebf0f6'
            buttonName = getAuthenticatedToken()
                ? 'Reservar cita'
                : 'Inicia sesión para reservar cita'
            isButtonDisabled = getAuthenticatedToken() ? false : true
            break
        case 'clo0e0a200002xy04bwqml93h':
            backgroundcolor = '#F6F6EB'
            buttonName = getAuthenticatedToken()
                ? 'Reservar cita'
                : 'Inicia sesión para reservar cita'
            isButtonDisabled = getAuthenticatedToken() ? false : true

            break
        case 'clo0e0mn50003xy040gwqse36':
            backgroundcolor = '#ebf0f6'
            buttonName = 'Solcitar presupuesto'
            isButtonDisabled = user ? false : true

            break
        case 'clo0e17d30004xy04cjklg2px':
            backgroundcolor = '#F6F6EB'
            buttonName = getAuthenticatedToken()
                ? 'Pagar el servicio'
                : 'Inicia sesión para pagar'
            isButtonDisabled = getAuthenticatedToken() ? false : true
            break
        case 'clo0e1e3p0005xy04izx8uzqa':
            backgroundcolor = '#ebf0f6'
            buttonName = getAuthenticatedToken()
                ? 'Reservar cita'
                : 'Inicia sesión para reservar cita'
            isButtonDisabled = getAuthenticatedToken() ? false : true

            break
        case 'clo0e1q180006xy04pu96nyml':
            backgroundcolor = '#F6F6EB'
            buttonName = 'Contáctanos'
            isButtonDisabled = user ? false : true

            break
        default:
            backgroundcolor = '#ebf0f6'
            buttonName = getAuthenticatedToken()
                ? 'Reservar cita'
                : 'Inicia sesión para reservar cita'
            isButtonDisabled = getAuthenticatedToken() ? false : true
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
                <ButtonContainerServices>
                    <HoverMotion>
                        <Button
                            disabled={isButtonDisabled}
                            onClick={() => {
                                if (buttonName === 'Reservar cita') {
                                    handleOpen()
                                } else if (buttonName === 'Pagar el servicio') {
                                    handleReservarCita()
                                } else if (buttonName === 'Contáctanos') {
                                    contactWhatsApp()
                                } else if (
                                    buttonName === 'Solcitar presupuesto'
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
                <VideoYoutubeContainer
                    style={{
                        display: serviceData?.urlVideo ? 'flex' : 'none',
                    }}
                >
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