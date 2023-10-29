'use client'

import { FC, memo, useEffect } from 'react'
import CardTallerOrBlog from '@/components/CardTallerOrBlog'
import { useLogicTaller } from './logic'
import LayoutNavFooter from '@/layout/layout'
import { MainContainer, Title, Subtitle, Container } from './styles'
import CircularIndeterminate from '@/components/Loader'

const Talleres: FC = () => {
    const { fetchTalleres, talleres, isLoading } = useLogicTaller()

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
                        <>
                            <CircularIndeterminate />
                        </>
                    )
                    }
                    {talleres?.map(taller => (
                        <CardTallerOrBlog
                            key={taller.id}
                            mode="taller"
                            taller={taller}
                        />
                    ))}
                </Container>
            </MainContainer>
        </LayoutNavFooter>
    )
}

export default memo(Talleres)
