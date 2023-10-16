'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicHome } from '@/app/logic'
import {
    Container,
    NavContainer,
    SubtitleServices,
    TitleServices,
} from './styles'
import ResponsiveAppBar from '@/components/MenuNavBar'

interface Props {
    params: {
        service: string
    }
}

const Page: FC<Props> = ({ params }) => {
    const {
        serviceData,
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
        isLoading,
        logOut,
        setIsLoading,
        router,
        fetchServiceDetails,
    } = useLogicHome()

    useEffect(() => {
        getUserInfoDetails()
        fetchServiceDetails(params.service)
    }, [])

    return (
        <Container>
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

            <TitleServices widthtitle="400px" widthtitledesktop="800px">
                {serviceData?.title}
            </TitleServices>
            <SubtitleServices>{serviceData?.subtitle}</SubtitleServices>
        </Container>
    )
}

export default memo(Page)
