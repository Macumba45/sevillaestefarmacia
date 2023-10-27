'use client'

import { FC, memo, useEffect } from 'react'
import { UserProvider } from '@/context/UserContext'
import mapa from '../../assets/CONOCENOS/mapa.png'
import dermo from '../../assets/HOME/DERMO_FOTO.jpg'
import nutricion from '../../assets/HOME/NUTRICION_FOTO.jpg'
import laboratorio from '../../assets/HOME/LABORATORIO_FOTO.jpg'
import spd from '../../assets/HOME/SPD_FOTO.jpg'
import pendientes from '../../assets/HOME/PENDIENTES_BEBE_FOTO.png'
import veterinaria from '../../assets/HOME/VETERINARIA_FOTO_02.jpg'
import { Tooltip } from '@mui/material'
import HoverMotion from '@/animations/hover'
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
} from './styles'

const Conocenos: FC = () => {
    const address = 'Calle Periodista Juan Tribuna, 8 (Local 2) 41019 Sevilla'

    const handleMapClick = () => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            address
        )}`

        window.open(googleMapsUrl, '_blank')
    }

    useEffect(() => {
        document.title = 'Conócenos'
    }, [])

    const services = [
        {
            name: 'Análisis de la piel',
            img: dermo,
            route: `/services/clo0dzomz0001xy04kzkxay49`,
        },
        {
            name: 'Nutricion y clinica deportiva',
            img: nutricion,
            route: '/services/clo0e0a200002xy04bwqml93h',
        },
        {
            name: 'Laboratorio de formulación magistral',
            img: laboratorio,
            route: '/services/clo0e0mn50003xy040gwqse36',
        },
        {
            name: 'Sistema Personalizado de Dosificación',
            img: spd,
            route: '/services/clo0e17d30004xy04cjklg2px',
        },
        {
            name: 'Pendientes Bebé',
            img: pendientes,
            route: '/services/clo0e1e3p0005xy04izx8uzqa',
        },
        {
            name: 'Farmacia Veterinaria',
            img: veterinaria,
            route: '/services/clo0e1q180006xy04pu96nyml',
        },
    ]

    const handleServiceClick = (route: string) => {
        window.location.href = route
    }

    return (
        <UserProvider>
            <MainContainer>
                <ContainerData>
                    <Title>
                        FARMACIA STA. BÁRBARA <br />
                        SEVILLA ESTE
                    </Title>
                    <SubtitleServices>Quiénes somos</SubtitleServices>

                    <ContainerParrafosAndServices>
                        <ContainerParrafos>
                            <ParrafoServices>
                                Profesionales expertos en medicamentos.
                            </ParrafoServices>
                            <ParrafoServices>
                                Farmacéuticos por vocación y profesión,
                                cosechamos con nuestros conocimientos la mejora
                                de la salud basándonos en la utilización
                                medicamentos como tratamiento y prevención en la
                                localidad de Sevilla desde 1960.
                            </ParrafoServices>
                            <ParrafoServices>
                                Nos encontramos en:
                                <br />
                                Calle Periodista Juan Tribuna, 8 (Local 2) 41019
                                Sevilla.
                            </ParrafoServices>
                            <ParrafoServices>
                                Horario: <br /> ·Lunes a viernes de 9:30h a
                                21:30h <br /> ·Sábado de 9:30h a 14:.00h <br />{' '}
                                ·Domingo de 10:00h a 14:00h
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
                                                    src={service.img.src}
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
        </UserProvider>
    )
}

export default memo(Conocenos)
