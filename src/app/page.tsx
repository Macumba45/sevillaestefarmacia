'use client'

import { FC, memo, useEffect } from 'react'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useLogicHome } from './logic'
import Services from '@/components/Services'
import AnimatedView from '../animations/AnimatedContainer'
import { Button } from '@mui/material'
import dermo from '../assets/HOME/DERMO_FOTO.jpg'
import nutricion from '../assets/HOME/NUTRICION_FOTO.jpg'
import laboratorio from '../assets/HOME/LABORATORIO_FOTO.jpg'
import spd from '../assets/HOME/SPD_FOTO.jpg'
import pendientes from '../assets/HOME/PENDIENTES_BEBE_FOTO.png'
import veterinaria from '../assets/HOME/VETERINARIA_FOTO_02.jpg'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
    ButtonContainerConocenos,
    ContainerConocenos,
    SubtitleConocenos,
    TitleConocenos,
    LoadingContainer,
    HeaderServices,
    TitleHeaderServices,
    IconHeaderTitle,
} from './styles'
import { UserProvider } from '@/context/UserContext'
import HoverMotion from '@/animations/hover'

const Home: FC = () => {
    const { isLoading, setIsLoading } = useLogicHome()

    useEffect(() => {
        document.title = 'Farmacia Santa Bárbara'
    }),
        []

    setTimeout(() => {
        setIsLoading(true)
    }, 500)

    // if (!isLoading) {
    //     return (

    //         <LoadingContainer>
    //             <CircularIndeterminate />
    //         </LoadingContainer>

    //     )
    // }
    return (
        <UserProvider>
            <div>
                <AnimatedView>
                    <ContainerConocenos>
                        <TitleConocenos>
                            Salud + Vida + Emociones
                        </TitleConocenos>
                        <SubtitleConocenos>
                            Nos mueve el equilibrio, nos mueve tu salud.
                        </SubtitleConocenos>
                        <ButtonContainerConocenos>
                            <Link
                                style={{
                                    textDecoration: 'none',
                                }}
                                href={'/conocenos'}
                            >
                                <HoverMotion>
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
                                        Conócenos
                                    </Button>
                                </HoverMotion>
                            </Link>
                        </ButtonContainerConocenos>
                    </ContainerConocenos>
                </AnimatedView>
                <AnimatedView>
                    <HeaderServices>
                        <TitleHeaderServices>SERVICIOS</TitleHeaderServices>
                        <IconHeaderTitle>
                            <ArrowDropDownIcon sx={{ fontSize: 40 }} />
                            <ArrowDropDownIcon sx={{ fontSize: 40 }} />
                            <ArrowDropDownIcon sx={{ fontSize: 40 }} />
                            <ArrowDropDownIcon sx={{ fontSize: 40 }} />
                            <ArrowDropDownIcon sx={{ fontSize: 40 }} />
                            <ArrowDropDownIcon sx={{ fontSize: 40 }} />
                        </IconHeaderTitle>
                    </HeaderServices>
                </AnimatedView>
                <AnimatedView>
                    <Services
                        id="clo0dzomz0001xy04kzkxay49"
                        title="DERMOCOSMÉTICA FARMACÉUTICA"
                        subtitle="Análisis de la Piel"
                        description="¿Te gustaría conocer más sobre tu piel o tu salud capilar?"
                        buttonName="Más información"
                        backGrodunColor="#ebf0f6"
                        picture={dermo.src}
                        widthMobile="230px"
                        widthDesktop="330px"
                        widthTitle="330px"
                        imagePosition="bottom"
                    />
                </AnimatedView>
                <AnimatedView>
                    <Services
                        id="clo0e0a200002xy04bwqml93h"
                        title="NUTRICIÓN CLÍNICA Y DEPORTIVA"
                        subtitle="Nutrición"
                        description="Nuestro propósito no es llegar lo antes posible, sino darte las herramientas para llegar al objetivo dando siempre prioridad a tu salud."
                        buttonName="Más información"
                        backGrodunColor="#f6f6eb"
                        picture={nutricion.src}
                        widthDesktop="500px"
                        widthTitle="350px"
                        imagePosition="bottom"
                        widthMobile="350px"
                        flexDirection="row-reverse"
                        widthTitleDesktop="400px"
                    />
                </AnimatedView>
                <AnimatedView>
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
                        widthDesktop="470px"
                        imagePosition="bottom"
                    />
                </AnimatedView>
                <AnimatedView>
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
                        widthMobile="350px"
                        widthDesktop="500px"
                        imagePosition="bottom"
                        flexDirection="row-reverse"
                        widthTitle="300px"
                        widthTitleDesktop="500px"
                    />
                </AnimatedView>
                <AnimatedView>
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
                        widthMobile="330px"
                        widthDesktop="610px"
                        widthTitle="330px"
                        imagePosition="bottom"
                    />
                </AnimatedView>
                <AnimatedView>
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
                        widthDesktop="430px"
                        widthTitle="330px"
                        imagePosition="bottom"
                        flexDirection="row-reverse"
                        widthTitleDesktop="378px"
                    />
                </AnimatedView>
                {/* <AnimatedView>
                    <Footer />
                </AnimatedView> */}
            </div>
        </UserProvider>
    )
}

export default memo(Home)
