'use client'

import { FC, memo, useEffect } from 'react'
import ResponsiveAppBar from '@/components/MenuNavBar'
import {
    ButtonContainerConocenos,
    ContainerConocenos,
    ContainerImgConocenos,
    ImgConocenos,
    NavContainer,
    SubtitleConocenos,
    TitleConocenos,
} from './styles'
import { Button } from '@mui/material'
import conocenosImg from '../assets/logo/conocenos.webp'

const Home: FC = () => {
    useEffect(() => {
        document.title = 'Farmacia Santa Bárbara'
    }),
        []

    return (
        <>
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
            <ContainerImgConocenos>
                <ImgConocenos src={conocenosImg.src} />
            </ContainerImgConocenos>
        </>
    )
}

export default memo(Home)
