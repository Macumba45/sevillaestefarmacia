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
import { UserContext } from '@/context/UserContext'

const Talleres: FC = () => {
    const {
        buttonName,
        closeDrawer,
        closeDrawerButton,
        currentUser,
        handleButtonClick,
        handleCloseNavMenu,
        handleOpenNavMenu,
        isDrawerOpen,
        isDrawerOpenButton,
        logOut,
    } = useLogicHome()

    const { fetchTalleres, talleres } = useLogicTaller()

    const { user } = useContext(UserContext)

    useEffect(() => {
        if (getAuthenticatedToken()) {
            fetchTalleres()
        }
    }, [])

    useEffect(() => {
        document.title = 'Talleres'
    }, [])

    return (
        <MainContainer>
            <NavContainer>
                <ResponsiveAppBar
                    closeDrawer={() => closeDrawer()}
                    handleButtonClick={() => handleButtonClick()}
                    handleCloseNavMenu={() => handleCloseNavMenu()}
                    handleOpenNavMenu={() => handleOpenNavMenu()}
                    closeDrawerButton={() => closeDrawerButton()}
                    isDrawerOpenButton={isDrawerOpenButton}
                    isDrawerOpen={isDrawerOpen}
                    buttonName={buttonName}
                    onLogOut={() => logOut()}
                    userRole={user}
                />
            </NavContainer>
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
    )
}

export default memo(Talleres)
