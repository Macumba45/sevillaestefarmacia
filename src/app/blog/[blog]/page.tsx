'use client'

import React, { FC, memo, useEffect } from 'react'
import { useLogicBlogDetail } from './logic'
import { Divider, Fab } from '@mui/material'
import HoverMotion from '@/animations/hover'
import LayoutNavFooter from '@/layout/layout'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import CircularIndeterminate from '@/components/Loader'
import { FloatButtonContainer } from '@/app/styles'
import { MainContainer, Title, Subtitle } from '../styles'
import {
    PictureContainer,
    Picture,
    TitleDetails,
    SubtitleDetails,
    ParrafoServices,
} from './styles'

interface Props {
    params: {
        blog: string
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
    const { getBlogDetailsData, blogDetails, contactWhatsApp, isLoading } =
        useLogicBlogDetail()

    useEffect(() => {
        getBlogDetailsData(params.blog)
    }, [])

    useEffect(() => {
        document.title = ` Blog | ${blogDetails?.title}`
    }),
        [document.title]

    return (
        <LayoutNavFooter>
            <MainContainer>
                <Title>
                    BLOG
                    <Divider
                        sx={{
                            width: '30%',
                            height: '3px',
                            backgroundColor: 'black',
                            marginTop: '3rem',
                        }}
                    />
                </Title>
                <Subtitle>Consejos farmacéuticos</Subtitle>
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
                                src={blogDetails?.urlPicture}
                                alt={blogDetails?.title}
                            />
                        </PictureContainer>
                        <TitleDetails>{blogDetails?.title}</TitleDetails>
                        <SubtitleDetails>
                            {blogDetails?.subtitle}
                        </SubtitleDetails>
                        <ParrafoServices>
                            {formatTextWithLineBreaks(
                                blogDetails?.descripcion as string
                            )}
                        </ParrafoServices>
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
                            <WhatsAppIcon sx={{ marginRight: 1 }} /> ¿Te
                            asesoramos?
                        </Fab>
                    </HoverMotion>
                </FloatButtonContainer>
            </MainContainer>
        </LayoutNavFooter>
    )
}

export default memo(Page)
