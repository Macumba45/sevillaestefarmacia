'use client'
import { createContext, useEffect, useState } from 'react'
import { User } from '../../types/types'
import { useRouter } from 'next/navigation'
import { getAuthenticatedToken } from '../../storage/storage'
import ResponsiveAppBar from '@/components/MenuNavBar'
import { NavContainer } from '@/app/styles'

// Define el valor inicial del contexto como un objeto con las propiedades correctas.
const initialContextValue = {
    user: {} as any,
}

export const UserContext = createContext(initialContextValue)

export const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isDrawerOpenButton, setIsDrawerOpenButton] = useState(false)
    const [buttonName, setButtonName] = useState('' as string)
    const router = useRouter()

    const handleButtonClick = () => {
        if (user?.role === 'admin') {
            // Redirigir directamente al dashboard
            window.location.href = '/dashboard'
        } else if (user) {
            // Abrir el Drawer con las opciones de Perfil y Cerrar Sesión
            window.location.href = '/perfil'
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

    // Actualiza el valor del contexto con la información del usuario.
    const getUserInfo = async () => {
        try {
            setIsLoading(true)
            const token = getAuthenticatedToken()
            const response = await fetch('/api/user/getUserInfo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.ok) {
                const data = await response.json()
                setUser(data)
                setIsLoading(false)
            }
        } catch (error) {
            console.error('Error al obtener la información del usuario', error)
        }
    }

    // Llama a getUserInfo solo si aún no se ha obtenido la información del usuario.
    useEffect(() => {
        if (getAuthenticatedToken()) {
            getUserInfo()
        }
    }, [])

    useEffect(() => {
        if (user?.role === 'admin') {
            setButtonName('Ir al Dashboard')
        } else if (user) {
            setButtonName('Mi Perfil')
        } else {
            setButtonName('Iniciar sesión')
        }
    }, [user])

    return (
        <UserContext.Provider value={{ user }}>
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
                    userRole={user as User}
                    isLoading={isLoading}
                />
            </NavContainer>
            {children}
        </UserContext.Provider>
    )
}
