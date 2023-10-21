'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicHome } from './logic'
import { getAuthenticatedToken } from '../../storage/storage'
import Services from '@/components/Services'
import ResponsiveAppBar from '@/components/MenuNavBar'
import { Button } from '@mui/material'
import CircularIndeterminate from '@/components/Loader'
import dermo from '../assets/HOME/DERMO_FOTO.jpg'
import nutricion from '../assets/HOME/NUTRICION_FOTO.jpg'
import laboratorio from '../assets/HOME/LABORATORIO_FOTO.jpg'
import spd from '../assets/HOME/SPD_FOTO.jpg'
import pendientes from '../assets/HOME/PENDIENTES_BEBE_FOTO.png'
import veterinaria from '../assets/HOME/VETERINARIA_FOTO.png'
import {
    ButtonContainerConocenos,
    ContainerConocenos,
    NavContainer,
    SubtitleConocenos,
    TitleConocenos,
    LoadingContainer,
} from './styles'
import Footer from '@/components/Footer'

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
        router,
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
            <Services
                id="clo0dzomz0001xy04kzkxay49"
                title="DERMOCOSMÉTICA FARMACÉUTICA"
                subtitle="Análisis de la Piel"
                description="¿Te gustaría conocer más sobre tu piel o tu salud capilar?"
                buttonName="Más información"
                backGrodunColor="#ebf0f6"
                picture={dermo.src}
                widthMobile="385px"
                widthTitle="330px"
                imagePosition="bottom"
            />
            <Services
                id="clo0e0a200002xy04bwqml93h"
                title="NUTRICIÓN CLÍNICA Y DEPORTIVA"
                subtitle="Nutrición"
                description="Nuestro propósito no es llegar lo antes posible, sino darte las herramientas para llegar al objetivo dando siempre prioridad a tu salud."
                buttonName="Más información"
                backGrodunColor="#f6f6eb"
                picture={nutricion.src}
                widthDesktop="610px"
                widthTitle="350px"
                imagePosition="bottom"
                widthMobile="320px"
                flexDirection="row-reverse"
                widthTitleDesktop="480px"
            />
            <Services
                id="clo0e0mn50003xy040gwqse36"
                title="LABORATORIO"
                subtitle="Formulación Magistral"
                description="Especialistas en Formulación Magistral
                creando fórmulas y preparados oficiales
                con más de 30 años de experiencia."
                buttonName="Más información"
                backGrodunColor="#ebf0f6"
                picture={laboratorio.src}
                widthMobile="320px"
                widthDesktop="540px"
                imagePosition="bottom"
            />
            <Services
                id="clo0e17d30004xy04cjklg2px"
                title="SISTEMA PERSONALIZADO DE DOSIFICACIÓN"
                subtitle="SPD"
                description="Ayudamos especialmente a familiares mayores
                que son polimedicados o pacientes que tienen
                dificultad para seguir su medicación."
                buttonName="Más información"
                backGrodunColor="#f6f6eb"
                picture={spd.src}
                widthMobile="320px"
                widthDesktop="610px"
                imagePosition="bottom"
                flexDirection="row-reverse"
            />
            <Services
                id="clo0e1e3p0005xy04izx8uzqa"
                title="SUS PRIMEROS PENDIENTES"
                subtitle="Pendientes bebé"
                description="Nuestro servicio de pendientes cuenta
                con un equipo sanitario de profesionales
                farmacéuticos cualificado."
                buttonName="Más información"
                backGrodunColor="#ebf0f6"
                picture={pendientes.src}
                widthMobile="320px"
                widthDesktop="610px"
                widthTitle="330px"
                imagePosition="bottom"
            />
            <Services
                id="clo0e1q180006xy04pu96nyml"
                title="TU MASCOTA EN BUENAS MANOS"
                subtitle="Farmacia Veterinaria"
                description="Disponemos de productos veterinarios
                para tus mascotas y animales de granja."
                buttonName="Más información"
                backGrodunColor="#f6f6eb"
                picture={veterinaria.src}
                widthMobile="320px"
                widthDesktop="610px"
                widthTitle="330px"
                imagePosition="bottom"
                flexDirection="row-reverse"
                widthTitleDesktop="378px"
            />

            <Footer />
        </div>
    )
}

export default memo(Home)
