'use client'

import { FC, memo, useContext, useEffect } from 'react'
import CardTallerAndBlog from '@/components/CardTallerAndBlog'
import ResponsiveAppBar from '@/components/MenuNavBar'
import { useLogicHome } from '../logic'
import {
    MainContainer,
    NavContainer,
    TitleTalleres,
    SubtitleTalleres,
    ContainerTalleres,
} from './styles'
import { getAuthenticatedToken } from '../../../storage/storage'
import { useLogicTaller } from './logic'
import { UserContext, UserProvider } from '@/context/UserContext'

const Talleres: FC = () => {
    const { fetchTalleres, talleres } = useLogicTaller()

    useEffect(() => {
        fetchTalleres()
    }, [])

    useEffect(() => {
        document.title = 'Talleres'
    }, [])

    return (
        <UserProvider>
            <MainContainer>
                <TitleTalleres>Talleres</TitleTalleres>
                <SubtitleTalleres>¡No faltes!</SubtitleTalleres>
                <ContainerTalleres>
                    {talleres?.map(taller => (
                        <CardTallerAndBlog
                            key={taller.id}
                            mode="taller"
                            taller={taller}
                        />
                    ))}
                </ContainerTalleres>
            </MainContainer>
        </UserProvider>
    )
}

export default memo(Talleres)
