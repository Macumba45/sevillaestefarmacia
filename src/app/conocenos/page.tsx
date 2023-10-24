'use client'

import { FC, memo, useEffect } from 'react'
import ResponsiveAppBar from '@/components/MenuNavBar'
import { useLogicHome } from '../logic'
import mapa from '../../assets/CONOCENOS/mapa.png'
import {
    ImgMap,
    ContainerData,
    MapContainer,
    NavContainer,
    ParrafoServices,
    Title,
    VideoYoutube,
    VideoYoutubeContainer,
    ContainerServices,
    MainContainer,
    ServiciosDesktop,
} from './styles'
import { getAuthenticatedToken } from '../../../storage/storage'

const Conocenos: FC = () => {
    const {
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
        logOut,
    } = useLogicHome()

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

    useEffect(() => {
        if (getAuthenticatedToken()) {
            getUserInfoDetails()
        }
    }, [])

    return (
        <>
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
                        }}
                    >
                        <div
                            style={{
                                marginRight: '2rem',
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
                        </div>
                        <ContainerServices>
                            <ServiciosDesktop
                                style={{
                                    marginBottom: '1rem',
                                    fontWeight: 800,
                                }}
                            >
                                NUESTROS SERVICIOS
                            </ServiciosDesktop>
                            <ServiciosDesktop>
                                Análisis de la piel
                            </ServiciosDesktop>
                            <ServiciosDesktop>
                                Farmacia Veterinaria
                            </ServiciosDesktop>
                            <ServiciosDesktop>
                                Laboratorio de formulación magistral
                            </ServiciosDesktop>
                            <ServiciosDesktop>
                                Nutrición y clínica deportiva
                            </ServiciosDesktop>
                            <ServiciosDesktop>Pendientes Bebé</ServiciosDesktop>
                            <ServiciosDesktop>
                                Profesionales expertos en medicamentos.
                            </ServiciosDesktop>
                            <ServiciosDesktop>
                                Sistema Personalizado de Dosificación
                            </ServiciosDesktop>
                        </ContainerServices>
                    </div>
                    <ParrafoServices>
                        Nos encontramos en:
                        <br />
                        Calle Periodista Juan Tribuna, 8 (Local 2) 41019
                        Sevilla.
                    </ParrafoServices>
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
        </>
    )
}

export default memo(Conocenos)
