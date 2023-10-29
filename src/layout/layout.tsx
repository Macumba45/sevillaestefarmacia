import { NavContainer } from '@/app/styles'
import { FC, memo, useContext } from 'react'
import ResponsiveAppBar from '@/components/MenuNavBar'
import Footer from '@/components/Footer'
import { UserContext } from '@/context/UserContext'

interface Props {
    children: React.ReactNode
}

const LayoutNavFooter: FC<Props> = ({ children }) => {
    const { user, auth } = useContext(UserContext)

    return (
        <>
            <NavContainer>
                <ResponsiveAppBar isAuth={auth} userRole={user} />
            </NavContainer>
            {children}
            <Footer />
        </>
    )
}

export default memo(LayoutNavFooter)
