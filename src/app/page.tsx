'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicHome } from './logic'
import { getAuthenticatedToken } from '../../storage/storage'
import ResponsiveAppBar from '@/components/MenuNavBar'
import { Button } from '@mui/material'
import conocenosImg from '../assets/HOME/conocenos.webp'
import cerezas from '../assets/HOME/8552022.jpg'
import CircularIndeterminate from '@/components/Loader'
import {
    ButtonContainerConocenos,
    ContainerConocenos,
    ContainerDermo,
    ContainerImgHome,
    ImgConocenos,
    NavContainer,
    SubtitleConocenos,
    TitleConocenos,
    TitleDermo,
    SubtitleDermo,
    DescriptionDermo,
    ContainerNutricion,
    LoadingContainer,
    ContainerDesktopServices,
} from './styles'

const Home: FC = () => {
    const {
        logOut,
        getUserInfoDetails,
        handleButtonClick,
        isDrawerOpen,
        closeDrawer,
        handleOpenNavMenu,
        handleCloseNavMenu,
        closeDrawerButton,
        isDrawerOpenButton,
        buttonName,
        isLoading,
        currentUser,
    } = useLogicHome()

    useEffect(() => {
        document.title = 'Farmacia Santa Bárbara'
    }),
        []

    useEffect(() => {
        if (getAuthenticatedToken()) {
            getUserInfoDetails()
        }
    }, [])

    if (isLoading) {
        return (
            <LoadingContainer>
                <CircularIndeterminate />
            </LoadingContainer>
        )
    }

    return (
        <div>
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
            <ContainerConocenos>
                <TitleConocenos>Salud + Vida + Emociones</TitleConocenos>
                <SubtitleConocenos>
                    Nos mueve el equilibrio, nos mueve tu salud.
                </SubtitleConocenos>
                <ButtonContainerConocenos>
                    <Button
                        variant="outlined"
                        sx={{
                            color: 'black',
                            borderColor: 'black',
                            width: '200px',
                            borderRadius: '130px',
                            ':hover': {
                                backgroundColor: 'white',
                                color: 'black',
                                borderColor: 'white',
                            },
                            fontFamily: 'Cormorant Garamond',
                        }}
                    >
                        Conócenos
                    </Button>
                </ButtonContainerConocenos>
            </ContainerConocenos>
            <ContainerDesktopServices>
                <ContainerDermo>
                    <TitleDermo>
                        DERMOCOSMÉTICA <br /> FARMACÉUTICA
                    </TitleDermo>
                    <SubtitleDermo>Análisis de la Piel</SubtitleDermo>
                    <DescriptionDermo>
                        ¿Te gustaría conocer más <br /> sobre tu piel o tu salud
                        capilar?
                    </DescriptionDermo>
                    <ButtonContainerConocenos>
                        <Button
                            variant="outlined"
                            sx={{
                                color: 'black',
                                borderColor: 'black',
                                width: '200px',
                                borderRadius: '130px',
                                backgroundColor: 'white',
                                ':hover': {
                                    backgroundColor: 'black',
                                    color: 'white',
                                    borderColor: 'transparent',
                                },
                                fontFamily: 'Cormorant Garamond',
                            }}
                        >
                            Más información
                        </Button>
                    </ButtonContainerConocenos>
                </ContainerDermo>
                <ContainerImgHome>
                    <ImgConocenos src={conocenosImg.src} />
                </ContainerImgHome>
            </ContainerDesktopServices>
            <ContainerDesktopServices>
                <ContainerImgHome>
                    <ImgConocenos src={cerezas.src} />
                </ContainerImgHome>
                <ContainerNutricion>
                    <TitleDermo>
                        NUTRICIÓN CLÍNICA <br /> Y DEPORTIVA
                    </TitleDermo>
                    <SubtitleDermo>Nutrición</SubtitleDermo>
                    <DescriptionDermo>
                        Nuestro propósito no es llegar lo antes posible, sino
                        darte las herramientas para llegar al objetivo dando
                        siempre prioridad a tu salud.
                    </DescriptionDermo>
                    <ButtonContainerConocenos>
                        <Button
                            variant="outlined"
                            sx={{
                                color: 'black',
                                borderColor: 'black',
                                width: '200px',
                                borderRadius: '130px',
                                ':hover': {
                                    backgroundColor: 'white',
                                    color: 'black',
                                    borderColor: 'white',
                                },
                            }}
                        >
                            Más información
                        </Button>
                    </ButtonContainerConocenos>
                </ContainerNutricion>
            </ContainerDesktopServices>
        </div>
    )
}

export default memo(Home)
