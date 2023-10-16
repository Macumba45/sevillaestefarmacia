'use client'

import { FC, memo } from 'react'
import Link from 'next/link'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import logo from '../../assets/logo/logo.png'
import { ButtonLoginContainer, LogoImg, stylesNavBar } from './styles'
import { Props } from './types'
import { pages, pagesMobile } from './utility'
import { Divider } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'

const ResponsiveAppBar: FC<Props> = ({
    onLogOut,
    handleButtonClick,
    isDrawerOpen,
    isDrawerOpenButton,
    handleOpenNavMenu,
    handleCloseNavMenu,
    closeDrawerButton,
    buttonName,
    userRole,
}) => {
    const settings = [
        {
            name: userRole?.role === 'admin' ? 'Ir al dashboard' : 'Mi perfil',
            icon: (
                <>
                    <InstagramIcon sx={{ mr: 1, ml: 1 }} />
                </>
            ),
            route: '/perfil',
        },
        {
            name: 'Cerrar sesión',
            icon: (
                <>
                    <InstagramIcon sx={{ mr: 1, ml: 1 }} />
                </>
            ),
            route: '/auth/login',
        },
    ]
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
                        onClick={() => (location.href = '/')}
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
                            sx={{ zIndex: 9999999, padding: 400 }}
                        >
                            <div
                                style={{
                                    width: '220px', // Establece el ancho que desees para el panel lateral
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                }}
                            >
                                {pagesMobile.map((page, index) => (
                                    <Button key={index}>
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                                color: 'black',
                                                display: 'flex',
                                            }}
                                            href={page?.route as string}
                                            target={
                                                page.name === 'Síguenos'
                                                    ? '_blank'
                                                    : ''
                                            }
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {page?.icon}
                                                {page?.name}
                                            </div>
                                        </Link>
                                    </Button>
                                ))}
                                <Divider
                                    sx={{
                                        height: '2px',
                                        backgroundColor: 'black',
                                        width: '100%',
                                    }}
                                />
                                {settings.map((page, index) => (
                                    <Button key={index}>
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                                color: 'black',
                                                display: 'flex',
                                            }}
                                            href={page?.route as string}
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                {page?.icon}
                                                {page?.name}
                                            </div>
                                        </Link>
                                    </Button>
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
                        {pages.map((page, index) => (
                            <Button key={index}>
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: 'white',
                                        fontWeight: 500,
                                    }}
                                    href={page?.route as string}
                                    target={page?.name === '' ? '_blank' : ''}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {page?.icon}
                                        {page?.name}
                                    </div>
                                </Link>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <ButtonLoginContainer>
                            <>
                                <Button
                                    sx={{
                                        color: 'black',
                                        display: 'block',
                                        backgroundColor: 'white',
                                        ':hover': {
                                            backgroundColor: '#d3d3d3',
                                        },
                                    }}
                                    variant="contained"
                                    onClick={handleButtonClick}
                                >
                                    {buttonName}
                                </Button>
                                <Drawer
                                    sx={{ zIndex: 99999999 }}
                                    anchor="right"
                                    open={isDrawerOpenButton}
                                    onClose={closeDrawerButton}
                                    PaperProps={{
                                        sx: {
                                            width: 300,
                                        },
                                    }}
                                >
                                    <Button
                                        href="/perfil"
                                        onClick={closeDrawerButton}
                                    >
                                        Perfil
                                    </Button>
                                    <Button
                                        startIcon={<ExitToAppIcon />}
                                        onClick={() => {
                                            onLogOut()
                                            closeDrawerButton()
                                        }}
                                    >
                                        Cerrar Sesión
                                    </Button>
                                </Drawer>
                            </>
                        </ButtonLoginContainer>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default memo(ResponsiveAppBar)
