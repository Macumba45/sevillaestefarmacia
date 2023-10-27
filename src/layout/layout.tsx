import { NavContainer } from '@/app/styles'
import { FC, memo, useContext, useEffect, useState } from 'react'
import ResponsiveAppBar from '@/components/MenuNavBar'
import Footer from '@/components/Footer'
import { UserContext } from '@/context/UserContext'
import { User } from '../../types/types'

interface Props {
    children: React.ReactNode
}

const LayoutNavFooter: FC<Props> = ({ children }) => {
    const { user } = useContext(UserContext)

    return (
        <>
            <NavContainer>
                <ResponsiveAppBar userRole={user as User} />
            </NavContainer>
            {children}
            <Footer />
        </>
    )
}

export default memo(LayoutNavFooter)
