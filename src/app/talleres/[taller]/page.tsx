'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicTallerDetail } from './logic'
import LayoutNavFooter from '@/layout/layout'
import React from 'react'
import { Button } from '@mui/material'
import HoverMotion from '@/animations/hover'
import {
    ButtonContainerServices,
    MainContainer,
    ParrafoServices,
    Picture,
    PictureContainer,
    Subtitle,
    SubtitleDetails,
    Title,
    TitleDetails,
} from './styles'

interface Props {
    params: {
        taller: string
    }
}

function formatTextWithLineBreaks(text: string | undefined) {
    if (!text) {
        return null // o cualquier otro valor por defecto que desees
    }

    const paragraphs = text.split('\n').map((paragraph, index) => (
        <React.Fragment key={index}>
            {paragraph}
            <br />
        </React.Fragment>
    ))

    return paragraphs
}

const Page: FC<Props> = ({ params }) => {
    const { getTallerDetailsData, taller, contactWhatsApp } =
        useLogicTallerDetail()

    useEffect(() => {
        getTallerDetailsData(params.taller)
    }, [])

    useEffect(() => {
        document.title = ` Taller | ${taller?.title}`
    }),
        [document.title]

    return (
        <LayoutNavFooter>
            <MainContainer>
                <Title>TALLERES</Title>
                <Subtitle>¡No faltes!</Subtitle>
                <PictureContainer>
                    <Picture src={taller?.urlPicture} alt={taller?.title} />
                </PictureContainer>
                <TitleDetails>{taller?.title}</TitleDetails>
                <SubtitleDetails>{taller?.subtitle}</SubtitleDetails>
                <ParrafoServices>
                    {formatTextWithLineBreaks(taller?.descripcion as string)}
                </ParrafoServices>
                <HoverMotion>
                    <ButtonContainerServices>
                        <Button
                            onClick={contactWhatsApp}
                            variant="outlined"
                            sx={{
                                color: 'white',
                                borderColor: 'black',
                                width: '300px',
                                borderRadius: '130px',
                                backgroundColor: 'black',
                                ':hover': {
                                    backgroundColor: 'white',
                                    color: 'black',
                                    borderColor: 'black',
                                },
                                fontFamily: 'Cormorant Garamond',
                            }}
                        >
                            Reservar plaza
                        </Button>
                    </ButtonContainerServices>
                </HoverMotion>
            </MainContainer>
        </LayoutNavFooter>
    )
}

export default memo(Page)
