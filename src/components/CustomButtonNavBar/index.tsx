'use client'

import React, { FC, useState } from 'react'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { User } from '../../../types/types'
import { useRouter } from 'next/navigation'

interface Props {
    currentUser: User
    onLogOut: () => void
}

const CustomButton: FC<Props> = ({ currentUser, onLogOut }) => {
    const router = useRouter()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const openDrawer = () => {
        setIsDrawerOpen(true)
    }

    const closeDrawer = () => {
        setIsDrawerOpen(false)
    }

    const buttonName =
        currentUser?.role === 'admin'
            ? 'Ir al Dashboard'
            : currentUser
            ? 'Perfil'
            : 'Iniciar Sesión'

    const handleButtonClick = () => {
        if (currentUser?.role === 'admin') {
            // Redirigir directamente al dashboard
            window.location.href = '/dashboard'
        } else if (currentUser) {
            // Abrir el Drawer con las opciones de Perfil y Cerrar Sesión
            openDrawer()
        } else {
            // Redirigir a la página de inicio de sesión
            window.location.href = '/auth/login'
        }
    }

    return (
        <>
            <Button
                sx={{
                    color: 'black',
                    display: 'block',
                    backgroundColor: 'white',
                    ':hover': { backgroundColor: '#d3d3d3' },
                }}
                variant="contained"
                onClick={handleButtonClick}
            >
                {buttonName}
            </Button>
            <Drawer
                sx={{ zIndex: 99999999 }}
                anchor="right"
                open={isDrawerOpen}
                onClose={closeDrawer}
            >
                <Button href="/perfil" onClick={closeDrawer}>
                    Perfil
                </Button>
                <Button
                    startIcon={<ExitToAppIcon />}
                    onClick={() => {
                        onLogOut()
                        closeDrawer()
                    }}
                >
                    Cerrar Sesión
                </Button>
            </Drawer>
        </>
    )
}

export default CustomButton
