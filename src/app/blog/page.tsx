'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicBlog } from './logic'
import LayoutNavFooter from '@/layout/layout'
import CardTallerOrBlog from '@/components/CardTallerOrBlog'
import { MainContainer, Title, Subtitle, Container } from './styles'
import CircularIndeterminate from '@/components/Loader'
import AnimatedView from '@/animations/AnimatedContainer'
import { Divider, Fab } from '@mui/material'
import { FloatButtonContainer } from '../styles'
import HoverMotion from '@/animations/hover'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

const Blog: FC = () => {
    const { fetchBlogs, blogs, isLoading, contactWhatsApp } = useLogicBlog()

    useEffect(() => {
        fetchBlogs()
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = 'Farmacia Sta. Bárbara - Blog'
        }
    }, [])

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
                <Container>
                    {isLoading && (
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
                    )}
                    {blogs?.map(blogs => (
                        <AnimatedView key={blogs.id}>
                            <CardTallerOrBlog
                                key={blogs.id}
                                mode="blog"
                                blog={blogs}
                            />
                        </AnimatedView>
                    ))}
                </Container>
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

export default memo(Blog)
