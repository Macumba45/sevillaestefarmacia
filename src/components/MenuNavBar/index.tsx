'use client'

import { FC, memo, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Props } from './types'
import { pages, pagesMobile } from './utility'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import logo from '../../assets/logo/logo.png'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import LogoutIcon from '@mui/icons-material/Logout'
import HoverMotion from '@/animations/hover'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Tooltip,
    Typography,
} from '@mui/material'
import {
    ButtonLoginContainer,
    LogoContainer,
    LogoImg,
    stylesNavBar,
} from './styles'

const ResponsiveAppBar: FC<Props> = ({ user }) => {
    const router = useRouter()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [showSubmenu, setShowSubmenu] = useState(false)
    const submenuRef = useRef<HTMLDivElement>(null)
    // Cierra el submenu cuando se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                submenuRef.current &&
                !submenuRef.current.contains(event.target)
            ) {
                setShowSubmenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleButtonClick = () => {
        if (user?.role === 'admin') {
            // Redirigir directamente al dashboard
            router.push('/dashboard')
        } else if (user?.role === 'user') {
            // Abrir el Drawer con las opciones de Perfil y Cerrar Sesión
            router.push('/perfil')
        } else {
            // Redirigir a la página de inicio de sesión
            router.push('/auth/login')
        }
    }
    const handleOpenNavMenu = () => {
        setIsDrawerOpen(true)
    }

    const handleCloseNavMenu = () => {
        setIsDrawerOpen(false)
    }

    const logOut = () => {
        localStorage.removeItem('token')
        location.href = '/auth/login'
    }
    const settingsLogged = [
        {
            name: user?.role === 'admin' ? 'Ir al dashboard' : 'Mi perfil',

            route: user?.role === 'admin' ? '/dashboard' : '/perfil',
            void: () => {},
        },
        {
            name: 'Cerrar sesión',

            route: '/auth/login',
            void: logOut,
        },
    ]

    const settingsNotLogged = [
        {
            name: 'Iniciar sesión',

            route: '/auth/login',
        },
    ]

    return (
        <AppBar className="nav" style={stylesNavBar} position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LogoContainer>
                        <Link href={'/'}>
                            <LogoImg
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                                src={logo.src}
                                alt="Farmacia Sta Bárbara"
                            />
                        </Link>
                    </LogoContainer>
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
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
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
                            <div key={index}>
                                {page.name === 'Servicios' ? (
                                    <>
                                        <Button
                                            onClick={() =>
                                                setShowSubmenu(!showSubmenu)
                                            }
                                            sx={{
                                                fontFamily:
                                                    'Cormorant Garamond',
                                                fontSize: '0.875rem',
                                                cursor: 'pointer',
                                                color: 'white',
                                            }}
                                            endIcon={
                                                <ExpandMoreIcon
                                                    sx={{
                                                        color: 'white',
                                                        transition:
                                                            'transform 0.3s, color 0.3s', // Agrega transiciones para transform y color
                                                        transform: showSubmenu
                                                            ? 'rotate(180deg)'
                                                            : 'rotate(0)', // Aplica la rotación si showSubmenu es true
                                                    }}
                                                />
                                            }
                                        >
                                            {page.name.toLocaleUpperCase()}
                                        </Button>
                                        {showSubmenu &&
                                            page.name === 'Servicios' && (
                                                <div
                                                    ref={submenuRef}
                                                    style={{
                                                        position: 'absolute', // Para que esté fuera del flujo normal
                                                        top: '65px', // Puedes ajustar esto según tu diseño
                                                        left: '32%', // Puedes ajustar esto según tu diseño
                                                        backgroundColor:
                                                            'black',
                                                        padding: '10px',
                                                        zIndex: 1, // Asegura que esté por encima de otros elementos
                                                        cursor: 'pointer',
                                                        borderRadius: '10px',
                                                        boxShadow:
                                                            '0px 0px 10px 0px rgba(0,0,0,0.75)',
                                                    }}
                                                >
                                                    {page.subpages?.map(
                                                        (
                                                            subpage,
                                                            subpageIndex
                                                        ) => (
                                                            <HoverMotion
                                                                key={
                                                                    subpageIndex
                                                                }
                                                            >
                                                                <Button
                                                                    sx={{
                                                                        fontFamily:
                                                                            'Cormorant Garamond',
                                                                        width: '200px',

                                                                        marginTop: 1,
                                                                        textAlign:
                                                                            'center',
                                                                    }}
                                                                    key={
                                                                        subpageIndex
                                                                    }
                                                                >
                                                                    <Link
                                                                        style={{
                                                                            textDecoration:
                                                                                'none',
                                                                            color: 'white',
                                                                        }}
                                                                        href={
                                                                            subpage.route as string
                                                                        }
                                                                    >
                                                                        {
                                                                            subpage.name
                                                                        }
                                                                    </Link>
                                                                </Button>
                                                            </HoverMotion>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                    </>
                                ) : (
                                    <Button
                                        sx={{
                                            display: 'flex',
                                        }}
                                    >
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                                color: 'white',
                                                display: 'flex',
                                            }}
                                            href={page.route as string}
                                            target={
                                                page?.name === 'Tarjeta CLUB' ||
                                                page?.name === '' ||
                                                page?.name === 'Síguenos'
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
                                                {page.name}
                                                {page.icon}
                                            </div>
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <ButtonLoginContainer>
                            <>
                                {!user?.role ? (
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
                                            Iniciar sesión
                                        </Button>
                                    </>
                                ) : (
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <HoverMotion>
                                            <Button
                                                sx={{
                                                    color: 'black',
                                                    display: 'block',
                                                    backgroundColor: 'white',
                                                    ':hover': {
                                                        backgroundColor:
                                                            '#d3d3d3',
                                                    },
                                                }}
                                                variant="contained"
                                                onClick={handleButtonClick}
                                            >
                                                {user?.role === 'admin'
                                                    ? 'Ir al dashboard'
                                                    : 'Mi perfil'}
                                            </Button>
                                        </HoverMotion>
                                        <Tooltip
                                            title="Cerrar sesión"
                                            placement="bottom"
                                        >
                                            <LogoutIcon
                                                onClick={logOut}
                                                sx={{
                                                    ml: 2,
                                                }}
                                            />
                                        </Tooltip>
                                    </div>
                                )}

                                <Drawer
                                    anchor="right"
                                    open={isDrawerOpen}
                                    onClose={handleCloseNavMenu}
                                    PaperProps={{
                                        sx: {
                                            backgroundColor: 'black',
                                            width: '300px',
                                        },
                                    }}
                                    sx={{ zIndex: 9999999 }}
                                >
                                    <div
                                        style={{
                                            width: '250px', // Establece el ancho que desees para el panel lateral
                                            padding: '20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        {pagesMobile.map((page, index) => (
                                            <div key={index}>
                                                {page.name === 'Servicios' ? (
                                                    <Accordion>
                                                        <AccordionSummary
                                                            sx={{
                                                                backgroundColor:
                                                                    'black',
                                                                color: 'white',
                                                                paddingLeft:
                                                                    '7px',
                                                                minHeight:
                                                                    '20px',
                                                                height: '36.5px',
                                                            }}
                                                            expandIcon={
                                                                <ExpandMoreIcon
                                                                    sx={{
                                                                        color: 'white',
                                                                    }}
                                                                />
                                                            }
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontFamily:
                                                                        'Roboto',
                                                                    fontSize:
                                                                        '0.875rem',
                                                                    fontWeight: 700,
                                                                }}
                                                            >
                                                                {page.name.toLocaleUpperCase()}
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails
                                                            sx={{
                                                                backgroundColor:
                                                                    'black',
                                                                display: 'flex',
                                                                flexDirection:
                                                                    'column',
                                                                alignItems:
                                                                    'flex-start',
                                                                paddingLeft: 0.5,
                                                            }}
                                                        >
                                                            {page.subpages?.map(
                                                                (
                                                                    subpage,
                                                                    subpageIndex
                                                                ) => (
                                                                    <Button
                                                                        sx={{
                                                                            fontFamily:
                                                                                'Cormorant Garamond',
                                                                            display:
                                                                                'flex',
                                                                        }}
                                                                        key={
                                                                            subpageIndex
                                                                        }
                                                                    >
                                                                        <Link
                                                                            style={{
                                                                                textDecoration:
                                                                                    'none',
                                                                                color: 'white', // Puedes personalizar el color
                                                                                fontWeight: 700,
                                                                                fontFamily:
                                                                                    'Roboto',
                                                                            }}
                                                                            href={
                                                                                subpage.route as string
                                                                            }
                                                                        >
                                                                            {
                                                                                subpage.name
                                                                            }
                                                                        </Link>
                                                                    </Button>
                                                                )
                                                            )}
                                                        </AccordionDetails>
                                                    </Accordion>
                                                ) : (
                                                    <Button
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'flex-start',
                                                        }}
                                                    >
                                                        <Link
                                                            style={{
                                                                textDecoration:
                                                                    'none',
                                                                color: 'white',
                                                                display: 'flex',
                                                            }}
                                                            href={
                                                                page.route as string
                                                            }
                                                            target={
                                                                page?.name ===
                                                                    'Tarjeta CLUB' ||
                                                                page?.name ===
                                                                    '' ||
                                                                page?.name ===
                                                                    'Síguenos'
                                                                    ? '_blank'
                                                                    : ''
                                                            }
                                                        >
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    fontWeight: 700,
                                                                    fontFamily:
                                                                        'Roboto',
                                                                }}
                                                            >
                                                                {page.name}
                                                                {page.icon}
                                                            </div>
                                                        </Link>
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <Divider
                                            sx={{
                                                height: '1px',
                                                backgroundColor: 'white',
                                                width: '100%',
                                                mt: 2,
                                                mb: 2,
                                            }}
                                        />
                                        {user?.role
                                            ? settingsLogged.map(
                                                  (page, index) => (
                                                      <Button key={index}>
                                                          <Link
                                                              style={{
                                                                  textDecoration:
                                                                      'none',
                                                                  color: 'white',
                                                                  display:
                                                                      'flex',
                                                                  fontWeight: 700,
                                                                  fontFamily:
                                                                      'Roboto',
                                                              }}
                                                              href={
                                                                  page.route as string
                                                              }
                                                              onClick={
                                                                  page.void
                                                              }
                                                          >
                                                              <div
                                                                  style={{
                                                                      display:
                                                                          'flex',
                                                                      alignItems:
                                                                          'center',
                                                                      fontWeight: 700,
                                                                  }}
                                                              >
                                                                  {page?.name}
                                                              </div>
                                                          </Link>
                                                      </Button>
                                                  )
                                              )
                                            : settingsNotLogged.map(
                                                  (page, index) => (
                                                      <Button key={index}>
                                                          <Link
                                                              style={{
                                                                  textDecoration:
                                                                      'none',
                                                                  color: 'white',
                                                                  display:
                                                                      'flex',
                                                                  fontWeight: 700,
                                                                  fontFamily:
                                                                      'Roboto',
                                                              }}
                                                              href={
                                                                  page?.route as string
                                                              }
                                                          >
                                                              <div
                                                                  style={{
                                                                      display:
                                                                          'flex',
                                                                      alignItems:
                                                                          'center',
                                                                  }}
                                                              >
                                                                  {page?.name}
                                                              </div>
                                                          </Link>
                                                      </Button>
                                                  )
                                              )}
                                    </div>
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
