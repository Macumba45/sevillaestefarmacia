'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicHome } from './logic'
import { getAuthenticatedToken } from '../../storage/storage'
import ResponsiveAppBar from '@/components/MenuNavBar'
import { Button } from '@mui/material'
import conocenosImg from '../assets/HOME/conocenos.webp'
import cerezas from '../assets/HOME/8552022.jpg'
import nutricion from '../assets/HOME/nutricion.webp'
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
    DescriptionNutricion,
    LoadingContainer,
} from './styles'
import CircularIndeterminate from '@/components/Loader'

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
                />
            </NavContainer>
            <ContainerConocenos>
                <TitleConocenos>Salud + Vida + Emociones</TitleConocenos>
                <SubtitleConocenos>
                    Nos mueve el equilibrio, <br /> nos mueve tu salud.
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
                        }}
                    >
                        Conócenos
                    </Button>
                </ButtonContainerConocenos>
            </ContainerConocenos>
            <ContainerImgHome>
                <ImgConocenos src={conocenosImg.src} />
            </ContainerImgHome>
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
            </ContainerDermo>
            <ContainerImgHome>
                <ImgConocenos src={cerezas.src} />
            </ContainerImgHome>
            <ContainerNutricion>
                <TitleDermo>
                    NUTRICIÓN CLÍNICA <br /> Y DEPORTIVA
                </TitleDermo>
                <SubtitleDermo>Nutrición</SubtitleDermo>
                <DescriptionNutricion>
                    Nuestro propósito no es llegar lo antes posible, sino darte
                    las herramientas para llegar al objetivo dando siempre
                    prioridad a tu salud.
                </DescriptionNutricion>
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
            <ContainerImgHome>
                <ImgConocenos src={nutricion.src} />
            </ContainerImgHome>
        </div>
    )
}

export default memo(Home)
