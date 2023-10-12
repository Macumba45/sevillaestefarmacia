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

interface Props {
    onLogOut: () => void
    handleOpenNavMenu: () => void
    handleCloseNavMenu: () => void
    handleButtonClick: () => void
    closeDrawer: () => void
    isDrawerOpen: boolean
    isDrawerOpenButton: boolean
    closeDrawerButton: () => void
    buttonName: string
}

const ResponsiveAppBar: FC<Props> = ({
    onLogOut,
    handleButtonClick,
    isDrawerOpen,
    isDrawerOpenButton,
    handleOpenNavMenu,
    handleCloseNavMenu,
    closeDrawerButton,
    buttonName,
}) => {
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
