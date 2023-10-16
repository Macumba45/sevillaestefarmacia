import { getUserInfo } from '@/services/user'
import { useState } from 'react'
import { ServiceData, User } from '../../types/types'
import { useRouter } from 'next/navigation'
import { getServiceDetails } from '@/services/service'

export const useLogicHome = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isDrawerOpenButton, setIsDrawerOpenButton] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [serviceData, setServiceData] = useState<ServiceData>()
    const router = useRouter()

    //////////// NAVBARLOGIC///////////////////

    const getUserInfoDetails = async () => {
        setIsLoading(true)
        const userInfo = await getUserInfo()
        setCurrentUser(userInfo as User)
        setIsLoading(false)
    }

    const fetchServiceDetails = async (id: string) => {
        setIsLoading(true)
        const serviceDetails = await getServiceDetails(id)
        setServiceData(serviceDetails)
        setIsLoading(false)
    }

    const handleButtonClick = () => {
        if (currentUser?.role === 'admin') {
            // Redirigir directamente al dashboard
            window.location.href = '/dashboard'
        } else if (currentUser) {
            // Abrir el Drawer con las opciones de Perfil y Cerrar Sesión
            openDrawerButton()
        } else {
            // Redirigir a la página de inicio de sesión
            router.push('/auth/login')
        }
    }

    const logOut = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token')
            window.location.reload()
        }
    }

    const closeDrawer = () => {
        setIsDrawerOpen(false)
    }
    const openDrawerButton = () => {
        setIsDrawerOpenButton(true)
    }
    const closeDrawerButton = () => {
        setIsDrawerOpenButton(false)
    }

    const handleOpenNavMenu = () => {
        setIsDrawerOpen(true)
    }

    const handleCloseNavMenu = () => {
        setIsDrawerOpen(false)
    }

    const buttonName =
        currentUser?.role === 'admin'
            ? 'Ir al Dashboard'
            : currentUser?.role === 'user'
            ? 'Mi perfil'
            : 'Iniciar Sesión'

    //////////// NAVBARLOGIC///////////////////

    return {
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
        serviceData,
        router,
        fetchServiceDetails,
    }
}
