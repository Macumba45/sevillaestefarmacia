'use client'

import { FC, memo, useContext, useEffect } from 'react'
import LayoutNavFooter from '@/layout/layout'
import { MainContainer, ProfileDataContainer } from './styles'
import { UserContext } from '@/context/UserContext'
import { Typography } from '@mui/material'

const Perfil: FC = () => {
    const { user } = useContext(UserContext)
    // console.log(user)

    useEffect(() => {
        document.title = `Mi perfil - ${user.name}`

    }, [])

    return (
        <LayoutNavFooter>
            <MainContainer>
                <ProfileDataContainer>
                    <Typography variant="h5" component="h1">
                        {user.name}
                    </Typography>
                    <Typography marginTop={2} component="p">
                        {user.email}
                    </Typography>
                </ProfileDataContainer>
            </MainContainer>
        </LayoutNavFooter>
    )
}

export default memo(Perfil)
