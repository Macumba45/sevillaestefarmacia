'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicHome } from '@/app/logic'
import Link from 'next/link'
import ResponsiveAppBar from '@/components/MenuNavBar'
import CircularIndeterminate from '@/components/Loader'
import { Button, Fab } from '@mui/material'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import {
    ButtonContainerServices,
    Container,
    DescriptionServices,
    FloatButtonContainer,
    LoadingContainer,
    NavContainer,
    SubtitleServices,
    TitleServices,
} from './styles'
import DermoDescription from '@/components/DescriptionServices/dermo'

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

    const contactWhatsApp = () => {
        const phoneNumber = '+34682296561'
        const message = `Hola Farmacia Santa Bárbara, me gustaría solicitar información sobre el servicio ${serviceData?.title}`

        const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
            message
        )}`

        window.open(whatsappURL)
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
                <Link href={'/'}>
                    <Button
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
                </Link>
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
        </Container>
    )
}

export default memo(Page)
