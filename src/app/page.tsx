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
            <Services
                title="DERMOCOSMÉTICA FARMACÉUTICA"
                subTitle="Análisis de la Piel"
                description="¿Te gustaría conocer más sobre tu piel o tu salud capilar?"
                buttonName="Más información"
                backGrodunColor="#ebf0f6"
                picture={dermo.src}
                widthMobile="390px"
                widthTitle="450px"
                imagePosition="bottom"
            />
            <Services
                title="NUTRICIÓN CLÍNICA Y DEPORTIVA"
                subTitle="Nutrición"
                description="Nuestro propósito no es llegar lo antes posible, sino darte las herramientas para llegar al objetivo dando siempre prioridad a tu salud."
                buttonName="Más información"
                backGrodunColor="#f6f6eb"
                picture={nutricion.src}
                widthMobile="390px"
                widthDesktop="610px"
                widthTitle="500px"
                imagePosition="bottom"
                flexDirection="row-reverse"
            />
            <Services
                title="LABORATORIO"
                subTitle="Formulación Magistral"
                description="Especialistas en Formulación Magistral
                creando fórmulas y preparados oficiales
                con más de 30 años de experiencia."
                buttonName="Más información"
                backGrodunColor="#ebf0f6"
                picture={laboratorio.src}
                widthMobile="390px"
                widthDesktop="540px"
                imagePosition="bottom"
            />
            <Services
                title="SISTEMA PERSONALIZADO DE DOSIFICACIÓN"
                subTitle="SPD"
                description="Ayudamos especialmente a familiares mayores
                que son polimedicados o pacientes que tienen
                dificultad para seguir su medicación."
                buttonName="Más información"
                backGrodunColor="#f6f6eb"
                picture={spd.src}
                widthMobile="390px"
                widthDesktop="610px"
                imagePosition="bottom"
                flexDirection="row-reverse"
            />
            <Services
                title="SUS PRIMEROS PENDIENTES"
                subTitle="Pendientes bebé"
                description="Nuestro servicio de pendientes cuenta
                con un equipo sanitario de profesionales
                farmacéuticos cualificado."
                buttonName="Más información"
                backGrodunColor="#ebf0f6"
                picture={pendientes.src}
                widthMobile="390px"
                widthDesktop="610px"
                widthTitle="330px"
                imagePosition="bottom"
            />
            <Services
                title="TU MASCOTA EN BUENAS MANOS"
                subTitle="Farmacia Veterinaria"
                description="Disponemos de productos veterinarios
                para tus mascotas y animales de granja."
                buttonName="Más información"
                backGrodunColor="#f6f6eb"
                picture={veterinaria.src}
                widthMobile="390px"
                widthDesktop="610px"
                widthTitle="380px"
                imagePosition="bottom"
                flexDirection="row-reverse"
            />
        </div>
    )
}

export default memo(Home)
