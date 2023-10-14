import { getUserInfo } from '@/services/user'
import { useState } from 'react'
import { User } from '../../types/types'

export const useLogicHome = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isDrawerOpenButton, setIsDrawerOpenButton] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    //////////// NAVBARLOGIC///////////////////

    const getUserInfoDetails = async () => {
        setIsLoading(true)
        const userInfo = await getUserInfo()
        setCurrentUser(userInfo as User)
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
            window.location.href = '/auth/login'
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
        getUserInfoDetails,
        handleButtonClick,
        handleCloseNavMenu,
        handleOpenNavMenu,
        isDrawerOpen,
        isDrawerOpenButton,
        isLoading,
        logOut,
        currentUser,
    }
}
