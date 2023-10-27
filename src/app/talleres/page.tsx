'use client'

import { FC, memo, useEffect } from 'react'
import CardTallerOrBlog from '@/components/CardTallerOrBlog'
import { useLogicTaller } from './logic'
import { UserProvider } from '../../context/UserContext'
import { MainContainer, Title, Subtitle, Container } from './styles'

const Talleres: FC = () => {
    const { fetchTalleres, talleres } = useLogicTaller()

    useEffect(() => {
        fetchTalleres()
    }, [])

    useEffect(() => {
        window.document.title = 'Talleres'
    }, [window.document.title])

    return (
        <UserProvider>
            <MainContainer>
                <Title>TALLERES</Title>
                <Subtitle>¡No faltes!</Subtitle>
                <Container>
                    {talleres?.map(taller => (
                        <CardTallerOrBlog
                            key={taller.id}
                            mode="taller"
                            taller={taller}
                        />
                    ))}
                </Container>
            </MainContainer>
        </UserProvider>
    )
}

export default memo(Talleres)
