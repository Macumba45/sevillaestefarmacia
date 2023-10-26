'use client'

import { FC, memo, useEffect, useState } from 'react'
import { UserProvider } from '@/context/UserContext'
import mapa from '../../assets/CONOCENOS/mapa.png'
import dermo from '../../assets/HOME/DERMO_FOTO.jpg'
import nutricion from '../../assets/HOME/NUTRICION_FOTO.jpg'
import laboratorio from '../../assets/HOME/LABORATORIO_FOTO.jpg'
import spd from '../../assets/HOME/SPD_FOTO.jpg'
import pendientes from '../../assets/HOME/PENDIENTES_BEBE_FOTO.png'
import veterinaria from '../../assets/HOME/VETERINARIA_FOTO_02.jpg'
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
} from './styles'
import { Button, Tooltip } from '@mui/material'
import HoverMotion from '@/animations/hover'

const Conocenos: FC = () => {
    const address = 'Calle Periodista Juan Tribuna, 8 (Local 2) 41019 Sevilla'

    const handleMapClick = () => {
        // Reemplaza "YOUR_API_KEY" con tu clave de API de Google Maps (si es necesario)
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
            route: '/servicios/dermoanalisis',
        },
        {
            name: 'Nutricion y clinica deportiva',
            img: nutricion,
            route: '/servicios/dermoanalisis',
        },
        {
            name: 'Laboratorio de formulación magistral',
            img: laboratorio,
            route: '/servicios/dermoanalisis',
        },
        {
            name: 'Sistema Personalizado de Dosificación',
            img: spd,
            route: '/servicios/dermoanalisis',
        },
        {
            name: 'Pendientes Bebé',
            img: pendientes,
            route: '/servicios/dermoanalisis',
        },
        {
            name: 'Farmacia Veterinaria',
            img: veterinaria,
            route: '/servicios/dermoanalisis',
        },
    ]

    const handleServiceClick = (route: string) => {
        window.location.href = route
    }
    const [hoveredService, setHoveredService] = useState(null)

    return (
        <UserProvider>
            <MainContainer>
                <ContainerData>
                    <Title>
                        FARMACIA STA BÁRBARA <br />
                        SEVILLA ESTE
                    </Title>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '2rem',
                            width: '100%',
                        }}
                    >
                        <div
                            style={{
                                marginRight: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <ParrafoServices>
                                Profesionales expertos en medicamentos.
                                <br />
                                <br />
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
                        </div>
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
                                    width: '500px',
                                }}
                            >
                                {services.map((service, index) => (
                                    <HoverMotion key={index}>
                                        <div
                                            key={index}
                                            onMouseEnter={() =>
                                                setHoveredService(
                                                    service as any
                                                )
                                            }
                                            onMouseLeave={() =>
                                                setHoveredService(null)
                                            }
                                            onClick={() =>
                                                handleServiceClick(
                                                    service.route
                                                )
                                            }
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
                    </div>
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
