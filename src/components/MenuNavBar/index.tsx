'use client'
import { FC, memo, use, useEffect, useState } from 'react'
import { useLogicDashboard } from '@/app/dashboard/logic'
import { User } from '../../../types/types'
import Link from 'next/link'
import CustomButton from '../CustomButtonNavBar'
import { getAuthenticatedToken } from '../../../storage/storage'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import logo from '../../assets/logo/logo.png'
import InstagramIcon from '@mui/icons-material/Instagram'
import { ButtonLoginContainer, LogoImg } from './styles'

const stylesNavBar = {
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    backgroundColor: 'black',
    color: 'white',
}

const pages = [
    'Servicios',
    'Talleres',
    'Blog',
    'Tarjeta CLUB',
    {
        name: '',
        icon: <InstagramIcon sx={{ mr: 1, ml: 1 }} />,
    },
]
const pagesMobile = [
    'Servicios',
    'Talleres',
    'Blog',
    'Tarjeta CLUB',
    {
        name: 'Síguenos',
        icon: (
            <>
                <InstagramIcon sx={{ mr: 1, ml: 1 }} />
            </>
        ),
        route: 'https://www.instagram.com/farmaciasantabarbara/',
    },
    'Mi cuenta',
]

const ResponsiveAppBar: FC = () => {
    const { getUserInfo, currentUser } = useLogicDashboard()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const logOut = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token')
            window.location.reload()
        }
    }

    useEffect(() => {
        if (getAuthenticatedToken()) {
            getUserInfo()
        }
    }, [])

    const handleOpenNavMenu = () => {
        setIsDrawerOpen(true)
    }

    const handleCloseNavMenu = () => {
        setIsDrawerOpen(false)
    }

    return (
        <AppBar style={stylesNavBar} position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LogoImg
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        src={logo.src}
                        alt="Farmacia Santa Bárbara"
                    />

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: {
                                xs: 'flex',
                                md: 'none',
                                justifyContent: 'flex-end',
                            },
                            padding: 0,
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            onClick={handleOpenNavMenu} // Aquí
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={isDrawerOpen}
                            onClose={handleCloseNavMenu}
                            sx={{ zIndex: 9999999 }}
                        >
                            <div
                                style={{
                                    width: '250px', // Establece el ancho que desees para el panel lateral
                                    padding: '20px',
                                }}
                            >
                                {/* Aquí puedes colocar los elementos que quieras en el panel lateral */}
                                {pagesMobile.map((page, index) => (
                                    <MenuItem key={index}>
                                        {typeof page === 'object' ? (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {page.name}
                                                {page.icon}
                                                <Link href={page.route}></Link>
                                            </div>
                                        ) : (
                                            <div>{page}</div>
                                        )}
                                    </MenuItem>
                                ))}
                            </div>
                        </Drawer>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: {
                                xs: 'none',
                                md: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                        }}
                    >
                        {pages.map(page => (
                            <Button
                                sx={{
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 300,
                                }}
                                key={page.toString()}
                            >
                                {typeof page === 'object' ? (
                                    <>
                                        {page.name} {page.icon}
                                    </>
                                ) : (
                                    <>{page}</>
                                )}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <ButtonLoginContainer>
                            <CustomButton
                                currentUser={currentUser as User}
                                onLogOut={logOut}
                            />
                        </ButtonLoginContainer>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default memo(ResponsiveAppBar)
