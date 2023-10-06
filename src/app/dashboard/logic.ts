import { useCallback, useState } from 'react'
import { getAuthenticatedToken } from '../../../storage/storage'
import { useRouter } from 'next/navigation'
import { User } from '../../../types/types'

export const useLogicDashboard = () => {
    const [currentUser, setCurrentUser] = useState<User>()
    const [titleDrawer, setTitleDrawer] = useState<string>('Dashboard')
    const router = useRouter()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [route, setRoute] = useState('dashboard')
    const titlePage = 'Dashboard'
    const [userLoaded, setUserLoaded] = useState(false)
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const changeRoute = (newRoute: string) => {
        setRoute(newRoute)
        setTitleDrawer(newRoute)
    }

    const logOut = () => {
        localStorage.removeItem('token')
        router.push('/dashboard/auth/login')
    }

    const getUserInfo = useCallback(async () => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
            const response = await fetch('/api/user/getUserInfo', {
                method: 'GET',
                headers,
            })
            if (response.ok) {
                const data = await response.json()
                setCurrentUser(data.user)
            } else {
                console.error('Error al obtener el usuario')
                router.push('/')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [router])

    return {
        currentUser,
        getUserInfo,
        router,
        mobileOpen,
        handleDrawerToggle,
        route,
        changeRoute,
        logOut,
        titlePage,
        titleDrawer,
        open,
        setOpen,
        handleOpen,
        userLoaded,
        setUserLoaded,
    }
}
