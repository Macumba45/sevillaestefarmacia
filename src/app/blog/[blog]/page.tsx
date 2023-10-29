'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicBlogDetail } from './logic'
import React from 'react'
import { Button } from '@mui/material'
import HoverMotion from '@/animations/hover'
import LayoutNavFooter from '@/layout/layout'
import { MainContainer, Title, Subtitle } from '../styles'
import {
    PictureContainer,
    Picture,
    TitleDetails,
    SubtitleDetails,
    ParrafoServices,
    ButtonContainerServices,
} from './styles'
import CircularIndeterminate from '@/components/Loader'

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
                <Title>Blog</Title>
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
                    </>
                )}
            </MainContainer>
        </LayoutNavFooter>
    )
}

export default memo(Page)
