'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicTallerDetail } from './logic'
import LayoutNavFooter from '@/layout/layout'
import React from 'react'
import { Button, Divider, Fab } from '@mui/material'
import HoverMotion from '@/animations/hover'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
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
import CircularIndeterminate from '@/components/Loader'
import { FloatButtonContainer } from '../styles'

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
    const { getTallerDetailsData, taller, contactWhatsApp, isLoading } =
        useLogicTallerDetail()

    useEffect(() => {
        getTallerDetailsData(params.taller)
    }, [])

    useEffect(() => {
        document.title = ` Taller | ${taller?.title}`
    }),
        [document.title]

    const finalizado = taller?.subtitle
        .trim()
        .toUpperCase()
        .includes('FINALIZADO')

    return (
        <LayoutNavFooter>
            <MainContainer>
                <Title>
                    TALLERES
                    <Divider
                        sx={{
                            width: '30%',
                            height: '3px',
                            backgroundColor: 'black',
                            marginTop: '3rem',
                        }}
                    />
                </Title>
                <Subtitle>¡No faltes!</Subtitle>
                {isLoading ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '40vh',
                        }}
                    >
                        <CircularIndeterminate />
                    </div>
                ) : (
                    <>
                        <PictureContainer>
                            <Picture
                                src={taller?.urlPicture}
                                alt={taller?.title}
                            />
                        </PictureContainer>
                        <TitleDetails>{taller?.title}</TitleDetails>
                        <SubtitleDetails>
                            Fecha: {taller?.subtitle}
                        </SubtitleDetails>
                        <ParrafoServices>
                            {formatTextWithLineBreaks(
                                taller?.descripcion as string
                            )}
                        </ParrafoServices>
                        <HoverMotion>
                            <ButtonContainerServices>
                                <Button
                                    onClick={contactWhatsApp}
                                    variant="outlined"
                                    disabled={finalizado}
                                    sx={{
                                        color: 'white',
                                        borderColor: 'black',
                                        width: '300px',
                                        borderRadius: '130px',
                                        backgroundColor: finalizado
                                            ? 'gray'
                                            : 'black',
                                        ':hover': {
                                            backgroundColor: 'white',
                                            color: 'black',
                                            borderColor: 'black',
                                        },
                                        fontFamily: 'Cormorant Garamond',
                                    }}
                                >
                                    {finalizado
                                        ? 'Taller finalizado'
                                        : 'Reservar'}
                                </Button>
                            </ButtonContainerServices>
                        </HoverMotion>
                    </>
                )}
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
                            <WhatsAppIcon sx={{ marginRight: 1 }} />
                            ¿Te asesoramos?
                        </Fab>
                    </HoverMotion>
                </FloatButtonContainer>
            </MainContainer>
        </LayoutNavFooter>
    )
}

export default memo(Page)
