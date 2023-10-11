'use client'

import { FC, memo, useEffect } from 'react'
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
} from './styles'

const Home: FC = () => {
    useEffect(() => {
        document.title = 'Farmacia Santa Bárbara'
    }),
        []

    return (
        <div>
            <NavContainer>
                <ResponsiveAppBar />
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
