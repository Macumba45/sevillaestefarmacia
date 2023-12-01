'use client'

import { FC, memo, useEffect } from 'react'
import CardTallerOrBlog from '@/components/CardTallerOrBlog'
import { useLogicTaller } from './logic'
import LayoutNavFooter from '@/layout/layout'
import CircularIndeterminate from '@/components/Loader'
import AnimatedView from '@/animations/AnimatedContainer'
import { Divider, Fab } from '@mui/material'
import HoverMotion from '@/animations/hover'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import {
    MainContainer,
    Title,
    Subtitle,
    Container,
    FloatButtonContainer,
} from './styles'

const Talleres: FC = () => {
    const { fetchTalleres, talleres, isLoading } = useLogicTaller()

    const contactWhatsApp = () => {
        const phoneNumber = '+34682734237'

        const whatsappURL = `https://wa.me/${phoneNumber}`

        window.open(whatsappURL)
    }

    useEffect(() => {
        fetchTalleres()
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = 'Farmacia Sta. Bárbara - Talleres'
        }
    }, [])

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
                    {talleres?.map(taller => (
                        <AnimatedView key={taller.id}>
                            <CardTallerOrBlog
                                key={taller.id}
                                mode="taller"
                                taller={taller}
                            />
                        </AnimatedView>
                    ))}
                </Container>
            </MainContainer>
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
                        <WhatsAppIcon sx={{ marginRight: 1 }} /> ¿Te asesoramos?
                    </Fab>
                </HoverMotion>
            </FloatButtonContainer>
        </LayoutNavFooter>
    )
}

export default memo(Talleres)
