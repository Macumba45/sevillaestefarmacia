'use client'

import { FC, memo, useEffect } from 'react'
import CardTallerOrBlog from '@/components/CardTallerOrBlog'
import { useLogicTaller } from './logic'
import LayoutNavFooter from '@/layout/layout'
import { MainContainer, Title, Subtitle, Container } from './styles'
import CircularIndeterminate from '@/components/Loader'
import AnimatedView from '@/animations/AnimatedContainer'

const Talleres: FC = () => {
    const { fetchTalleres, talleres, isLoading } = useLogicTaller()
    console.log(talleres)

    useEffect(() => {
        fetchTalleres()
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = 'Talleres'
        }
    }, [])

    return (
        <LayoutNavFooter>
            <MainContainer>
                <Title>TALLERES</Title>
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
        </LayoutNavFooter>
    )
}

export default memo(Talleres)
