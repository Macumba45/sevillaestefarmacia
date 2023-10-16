'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicHome } from '@/app/logic'
import { Container, TitleServices } from './styles'
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
        getServiceDetails,
        router,
        fetchServiceDetails,
    } = useLogicHome()

    useEffect(() => {
        getUserInfoDetails()
        fetchServiceDetails(params.service)
    }, [])

    return (
        <Container>
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

            <TitleServices widthtitle="300px">
                {serviceData?.title}
            </TitleServices>
        </Container>
    )
}

export default memo(Page)
