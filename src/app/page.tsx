'use client'

import { FC, memo, useContext, useEffect } from 'react'
import Link from 'next/link'
import { UserContext, UserProvider } from '../context/UserContext'
import HoverMotion from '@/animations/hover'
import Services from '@/components/Services'
import AnimatedView from '../animations/AnimatedContainer'
import { Button, Fab } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
    ButtonContainerConocenos,
    ContainerConocenos,
    SubtitleConocenos,
    TitleConocenos,
    HeaderServices,
    TitleHeaderServices,
    IconHeaderTitle,
    FloatButtonContainer,
} from './styles'

const Home: FC = () => {
    useEffect(() => {
        document.title = 'Farmacia Santa Bárbara'
    }),
        [document.title]

    const contactWhatsApp = () => {
        let message =
            'Hola Farmacia Sta.Bárbara, me gustaría que me asesoraran sobre:'
        const phoneNumber = '+34682296561'

        const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
            message
        )}`

        window.open(whatsappURL)
    }

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
                        picture={'https://i.postimg.cc/mgcCxQyV/DERMO-FOTO.jpg'}
                        alt="DERMOCOSMÉTICA FARMACÉUTICA"
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
                        picture={
                            'https://i.postimg.cc/pXxCPHbb/NUTRICION-FOTO.jpg'
                        }
                        alt="NUTRICIÓN CLÍNICA Y DEPORTIVA"
                        widthDesktop="500px"
                        widthTitle="320px"
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
                        picture={
                            'https://i.postimg.cc/nchq28sy/LABORATORIO-FOTO.jpg'
                        }
                        alt="LABORATORIO"
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
                        picture={'https://i.postimg.cc/BZgx2Zv5/SPD-FOTO.jpg'}
                        alt="SISTEMA PERSONALIZADO DE DOSIFICACIÓN"
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
                        picture={
                            'https://i.postimg.cc/Z513JCfm/PENDIENTES-BEBE-FOTO.png'
                        }
                        alt="SUS PRIMEROS PENDIENTES"
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
                        picture={
                            'https://i.postimg.cc/6qJ9fD1T/VETERINARIA-FOTO-02.jpg'
                        }
                        alt="TU MASCOTA EN BUENAS MANOS"
                        widthMobile="320px"
                        widthDesktop="430px"
                        widthTitle="330px"
                        imagePosition="bottom"
                        flexDirection="row-reverse"
                        widthTitleDesktop="378px"
                    />
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
            </div>
        </UserProvider>
    )
}

export default memo(Home)
