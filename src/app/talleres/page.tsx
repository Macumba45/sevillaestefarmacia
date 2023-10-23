'use client'

import { FC, memo, useEffect } from 'react'
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

const Talleres: FC = () => {
    const {
        buttonName,
        closeDrawer,
        closeDrawerButton,
        currentUser,
        getUserInfoDetails,
        handleButtonClick,
        handleCloseNavMenu,
        handleOpenNavMenu,
        isDrawerOpen,
        isDrawerOpenButton,
        logOut,
        router,
    } = useLogicHome()

    const { fetchTalleres, talleres } = useLogicTaller()

    useEffect(() => {
        if (getAuthenticatedToken()) {
            getUserInfoDetails()
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
                    userRole={currentUser}
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
