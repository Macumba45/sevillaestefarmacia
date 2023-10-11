import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import logo from '../../assets/logo/logo.png'
import Image from 'next/image'
import { ButtonLoginContainer, LogoContainer, LogoImg } from '@/app/styles'
import InstagramIcon from '@mui/icons-material/Instagram'

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
        icon: <InstagramIcon sx={{ mr: 1, ml: 1 }} />,
    },
]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    )
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    )

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
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
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pagesMobile.map((page, index) => (
                                <MenuItem key={index}>
                                    {typeof page === 'object' ? (
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {' '}
                                            {page.name}
                                            {page.icon}
                                        </div>
                                    ) : (
                                        <div>{page}</div>
                                    )}
                                </MenuItem>
                            ))}
                        </Menu>
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
                                    fontWeight: 400,
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
