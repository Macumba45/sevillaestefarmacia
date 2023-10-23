'use client'

import { FC, memo, useEffect } from 'react'
import CardTallerAndBlog from '@/components/CardTallerAndBlog'
import ResponsiveAppBar from '@/components/MenuNavBar'
import { useLogicHome } from '../logic'
import { MainContainer, NavContainer } from './styles'
import { getAuthenticatedToken } from '../../../storage/storage'

const Blogs: FC = () => {
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
        if (getAuthenticatedToken()) {
            getUserInfoDetails()
        }
    }, [])

    useEffect(() => {
        document.title = 'Blogs'
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
        </MainContainer>
    )
}

export default memo(Blogs)
