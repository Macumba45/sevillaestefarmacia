'use client'

import { FC, memo, useEffect } from 'react'
import { Fab, Tooltip } from '@mui/material'
import HoverMotion from '@/animations/hover'
import LayoutNavFooter from '@/layout/layout'
import AnimatedView from '@/animations/AnimatedContainer'
import mapa from '../../assets/CONOCENOS/mapa.png'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

import {
    ImgMap,
    ContainerData,
    MapContainer,
    ParrafoServices,
    Title,
    VideoYoutube,
    VideoYoutubeContainer,
    ContainerServices,
    MainContainer,
    ServiciosDesktop,
    ContainerParrafos,
    ContainerParrafosAndServices,
    SubtitleServices,
    FloatButtonContainer,
    SpanBold,
} from './styles'

const Conocenos: FC = () => {
    const handleMapClick = () => {
        const googleMapsUrl = `https://www.google.com/maps/place/Farmacia+Sta.+B%C3%A1rbara.+Sevilla+Este/@37.4041118,-5.9139216,18.68z/data=!4m6!3m5!1s0xd126f4c90bf07e7:0xfb6e4b26534ae22a!8m2!3d37.4040896!4d-5.9138217!16s%2Fg%2F11gd3bskf2?entry=ttu`

        window.open(googleMapsUrl, '_blank')
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = 'Conócenos'
        }
    }, [])

    const services = [
        {
            name: 'Análisis de la piel',
            img: 'https://res.cloudinary.com/dinasxwdf/image/upload/v1699541341/farmacia/w7b68kakfryynbeu7uhj.webp',
            route: `/services/clo0dzomz0001xy04kzkxay49`,
        },
        {
            name: 'Nutricion y clinica deportiva',
            img: 'https://res.cloudinary.com/dinasxwdf/image/upload/v1699541341/farmacia/g9snbrhtr5lafx0gqdf3.webp',
            route: '/services/clo0e0a200002xy04bwqml93h',
        },
        {
            name: 'Laboratorio de formulación magistral',
            img: 'https://res.cloudinary.com/dinasxwdf/image/upload/v1699541341/farmacia/qvuwsmdcgsxfy5tjsung.webp',
            route: '/services/clo0e0mn50003xy040gwqse36',
        },
        {
            name: 'Sistema Personalizado de Dosificación',
            img: 'https://res.cloudinary.com/dinasxwdf/image/upload/v1699541341/farmacia/jfclhh12esrx9qxbuggh.webp',
            route: '/services/clo0e17d30004xy04cjklg2px',
        },
        {
            name: 'Pendientes Bebé',
            img: 'https://res.cloudinary.com/dinasxwdf/image/upload/v1699541341/farmacia/weue18gzliqlr2mba3uk.webp',
            route: '/services/clo0e1e3p0005xy04izx8uzqa',
        },
        {
            name: 'Farmacia Veterinaria',
            img: 'https://res.cloudinary.com/dinasxwdf/image/upload/v1699541341/farmacia/j5x6zoorgtp4hwxi09me.webp',
            route: '/services/clo0e1q180006xy04pu96nyml',
        },
    ]

    const handleServiceClick = (route: string) => {
        window.location.href = route
    }

    const contactWhatsApp = () => {
        // const phoneNumber = '+34682734237'
        // let whatsappURL = ''

        // if (
        //     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        //         navigator.userAgent
        //     )
        // ) {
        //     // Es un dispositivo móvil
        //     whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}`
        // } else {
        //     // Es un escritorio
        //     whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}`
        // }

        // window.open(whatsappURL)

        const phoneNumber = '+34682734237'
        let whatsappURL = ''
        whatsappURL = `https://wa.me/${phoneNumber}`
        // if (navigator.userAgent.includes('Instagram')) {
        //     whatsappURL = `https://wa.me/${phoneNumber}`
        // }

        window.open(whatsappURL)
    }

    return (
        <LayoutNavFooter>
            <FloatButtonContainer>
                <HoverMotion>
                    <Fab
                        onClick={contactWhatsApp}
                        sx={{
                            color: 'white',
                            backgroundColor: 'black',

                            backgroundRepeat: 'no-repeat',
                            borderColor: 'black',
                            width: '100%',
                            borderRadius: '130px',
                            ':hover': {
                                backgroundColor: 'white',
                                color: 'black',
                                borderColor: 'black',
                            },
                            fontFamily: 'Cormorant Garamond',
                        }}
                        variant="extended"
                    >
                        <WhatsAppIcon sx={{ marginRight: 1 }} /> ¿Te asesoramos?
                    </Fab>
                </HoverMotion>
            </FloatButtonContainer>
            <MainContainer>
                <ContainerData>
                    <Title>
                        FARMACIA STA. BÁRBARA <br />
                        SEVILLA ESTE
                    </Title>
                    {/* <SubtitleServices>Quiénes somos</SubtitleServices> */}
                    <ContainerParrafosAndServices>
                        <ContainerParrafos>
                            <ParrafoServices>
                                <SpanBold>
                                    Nuestro equipo. Las personas adecuadas para
                                    este proyecto.
                                </SpanBold>
                            </ParrafoServices>
                            <ParrafoServices>
                                Desde hace más de dos décadas, las personas que
                                forman parte de la farmacia Sta Bárbara,
                                trabajan en el sector farmacéutico con especial
                                desempeño en el cuidado y prevención de la salud
                                de todos los pacientes.
                            </ParrafoServices>
                            <ParrafoServices>
                                Han sido años de aprendizaje, de adquisición de
                                conocimientos que día tras día hemos estado
                                cultivando y que nos ha permitido estar en todo
                                momento aportando confianza y excelencia a todos
                                nuestros pacientes.
                            </ParrafoServices>
                            <ParrafoServices>
                                Al mismo tiempo, hemos tenido la oportunidad de
                                rodearnos de proveedores con largos años de
                                trayectoria y experiencia generando un
                                compromiso estrecho para no desabastecer las
                                necesidades de todos los pacientes que solicitan
                                nuestros productos o servicios.
                            </ParrafoServices>
                            <ParrafoServices>
                                Así pues, en el año 2017 pusimos en marcha
                                nuestro primer proyecto Farmacia Sta. Bárbara.
                                Abrimos nuestras puertas el día 4 de diciembre
                                del 2017 y desde entonces no hemos parado de
                                trabajar por ofrecer un servicio exquisito y una
                                amplia cartera de servicios en constante
                                evolución para adaptarnos a tus necesidades.
                            </ParrafoServices>
                            <ParrafoServices>
                                Hoy, contamos con 6 servicios activos en
                                constante renovación y nos sentimos orgullosos
                                del trabajo realizado. Por supuesto, nuestro
                                objetivo es seguir aprendiendo y esforzarnos por
                                seguir ofreciendo un trato y un servicio
                                excepcional.
                            </ParrafoServices>
                            <ParrafoServices>
                                <SpanBold>
                                    Nuestro principal objetivo es facilitarte
                                    las herramientas necesarias para ofrecer y
                                    obtener una vida llena de salud, optimismo y
                                    bienestar a través de la atención
                                    farmacéutica.{' '}
                                </SpanBold>
                            </ParrafoServices>
                            <ParrafoServices>
                                <SpanBold>
                                    Farmacia Sta. Bárbara es tu hogar.
                                </SpanBold>
                            </ParrafoServices>
                            <ParrafoServices>
                                <SpanBold>
                                    Horario: <br /> ·Lunes a viernes de 9:00h a
                                    21.30h (ininterrumpido) <br /> ·Sábados de
                                    9:30h a 14:.00h <br /> ·Domingos y festivos:
                                    9:30h a 14:00h
                                </SpanBold>
                            </ParrafoServices>
                        </ContainerParrafos>
                        <ContainerServices>
                            <div>
                                <ServiciosDesktop
                                    style={{
                                        textAlign: 'center',
                                        marginBottom: '2rem',
                                        fontWeight: 900,
                                    }}
                                >
                                    NUESTROS SERVICIOS
                                </ServiciosDesktop>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    maxWidth: '500px',
                                    minWidth: '300px',
                                    margin: '0 auto',
                                    marginTop: '1rem',
                                }}
                            >
                                {services.map((service, index) => (
                                    <HoverMotion key={index}>
                                        <div
                                            key={index}
                                            style={{
                                                position: 'relative', // Para que el "toolbar" esté posicionado en relación con este div
                                                margin: '0.5rem',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            <Tooltip title={service.name} arrow>
                                                <img
                                                    onClick={() =>
                                                        handleServiceClick(
                                                            service.route
                                                        )
                                                    }
                                                    alt={service.name}
                                                    src={service.img as string}
                                                    style={{
                                                        width: '120px',
                                                        height: '120px',
                                                        objectFit: 'cover',
                                                        backgroundPosition:
                                                            'center',
                                                        cursor: 'pointer',
                                                        borderRadius: '50%',
                                                    }}
                                                />
                                            </Tooltip>
                                        </div>
                                    </HoverMotion>
                                ))}
                            </div>
                        </ContainerServices>
                    </ContainerParrafosAndServices>
                    <MapContainer>
                        <a
                            style={{
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            onClick={handleMapClick}
                        >
                            <ImgMap src={mapa.src} />
                        </a>
                    </MapContainer>
                    <VideoYoutubeContainer>
                        <VideoYoutube src="https://www.youtube.com/embed/_06yXI-9Xa8?si=CQG2RMVU5dPU-U8h" />
                    </VideoYoutubeContainer>
                </ContainerData>
            </MainContainer>
        </LayoutNavFooter>
    )
}

export default memo(Conocenos)
