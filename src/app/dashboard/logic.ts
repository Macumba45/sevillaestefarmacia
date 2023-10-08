import { useCallback, useState } from 'react'
import { getAuthenticatedToken } from '../../../storage/storage'
import { useRouter } from 'next/navigation'
import { Services, User } from '../../../types/types'

export const useLogicDashboard = () => {
    const [currentUser, setCurrentUser] = useState<User>()
    const [titleDrawer, setTitleDrawer] = useState<string>('Dashboard')
    const router = useRouter()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [route, setRoute] = useState('servicios')
    const titlePage = 'Dashboard'
    const [userLoaded, setUserLoaded] = useState(false)
    const [open, setOpen] = useState(false)
    const [services, setServices] = useState<Services[]>()

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

    const createService = useCallback(async (service: Services) => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
            const response = await fetch('/api/services/postService', {
                method: 'POST',
                headers,
                body: JSON.stringify(service),
            })
            if (response.ok) {
                const data: Services = await response.json()
                return data
            } else {
                console.error('Error al crear el servicio')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

    const getServices = useCallback(async () => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
            const response = await fetch('/api/services/getService', {
                method: 'GET',
                headers,
            })
            if (response.ok) {
                const data: Services[] = await response.json()
                setServices(data)
                return data
            } else {
                console.error('Error al obtener los servicios')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

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
        createService,
        getServices,
        services
    }
}
