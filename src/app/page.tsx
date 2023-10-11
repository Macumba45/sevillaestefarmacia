'use client'

import { FC, memo, useEffect } from 'react'
import { NavContainer } from './styles'
import ResponsiveAppBar from '@/components/MenuNavBar'

const Home: FC = () => {
    useEffect(() => {
        document.title = 'Farmacia Santa Bárbara'
    }),
        []

    return (
        <>
            <NavContainer>
                <ResponsiveAppBar />
            </NavContainer>
        </>
    )
}

export default memo(Home)
