import * as React from 'react'
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
import { Drawer } from '@mui/material'

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
    },
]

function ResponsiveAppBar() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

    const handleOpenNavMenu = () => {
        setIsDrawerOpen(true)
    }

    const handleCloseNavMenu = () => {
        setIsDrawerOpen(false)
    }

    const stylesNavBar = {
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        backgroundColor: 'black',
        color: 'white',
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
                            <Button
                                sx={{
                                    color: 'black',
                                    display: 'block',
                                    backgroundColor: 'white',
                                    ':hover': { backgroundColor: '#d3d3d3' },
                                }}
                                variant="contained"
                            >
                                Iniciar Sesión
                            </Button>
                        </ButtonLoginContainer>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar
