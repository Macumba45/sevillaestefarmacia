'use client'

import { FC, memo, useEffect } from 'react'
import CardTallerAndBlog from '@/components/CardTallerAndBlog'
import ResponsiveAppBar from '@/components/MenuNavBar'
import { useLogicHome } from '../logic'
import { MainContainer, NavContainer } from './styles'

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
            <CardTallerAndBlog />
            <CardTallerAndBlog />

            <CardTallerAndBlog />

            <CardTallerAndBlog />

            <CardTallerAndBlog />

            <CardTallerAndBlog />

            <CardTallerAndBlog />

            <CardTallerAndBlog />

            <CardTallerAndBlog />

            <CardTallerAndBlog />

            <CardTallerAndBlog />

            <CardTallerAndBlog />

            <CardTallerAndBlog />
        </MainContainer>
    )
}

export default memo(Talleres)
