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
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    Typography,
} from '@mui/material'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'

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

            route: userRole?.role === 'admin' ? '/dashboard' : '/perfil',
        },
        {
            name: 'Cerrar sesión',

            route: '/auth/login',
        },
    ]

    console.log(settings)
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
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={isDrawerOpen}
                            onClose={handleCloseNavMenu}
                            PaperProps={{
                                sx: {
                                    backgroundColor: 'black',
                                },
                            }}
                            sx={{ zIndex: 9999999 }}
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
                                    <div key={index}>
                                        {page.name === 'Servicios' ? (
                                            <Accordion>
                                                <AccordionSummary
                                                    sx={{
                                                        backgroundColor:
                                                            'black',
                                                        color: 'white',
                                                        paddingLeft: '7px',
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
                                                                'Cormorant Garamond',
                                                            fontSize:
                                                                '0.875rem',
                                                        }}
                                                    >
                                                        {page.name.toLocaleUpperCase()}
                                                    </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails
                                                    sx={{
                                                        backgroundColor:
                                                            'black',
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
                                                                    justifyContent:
                                                                        'flex-end',
                                                                    minWidth: 0,
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
                                            <Button>
                                                <Link
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'white',
                                                        display: 'flex',
                                                    }}
                                                    href={page.route as string}
                                                    target={
                                                        page.name === 'Síguenos'
                                                            ? '_blank'
                                                            : ''
                                                    }
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
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
                                {settings.map((page, index) => (
                                    <Button key={index}>
                                        <Link
                                            style={{
                                                textDecoration: 'none',
                                                color: 'white',
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
                                    anchor="right"
                                    open={isDrawerOpen}
                                    onClose={handleCloseNavMenu}
                                    PaperProps={{
                                        sx: {
                                            backgroundColor: 'black',
                                        },
                                    }}
                                    sx={{ zIndex: 9999999 }}
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
                                                                        'Cormorant Garamond',
                                                                    fontSize:
                                                                        '0.875rem',
                                                                }}
                                                            >
                                                                {page.name.toLocaleUpperCase()}
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails
                                                            sx={{
                                                                backgroundColor:
                                                                    'black',
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
                                                                            justifyContent:
                                                                                'flex-end',
                                                                            minWidth: 0,
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
                                                    <Button>
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
                                                                page.name ===
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
                                        {settings.map((page, index) => (
                                            <Button key={index}>
                                                <Link
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'white',
                                                        display: 'flex',
                                                    }}
                                                    href={page?.route as string}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                        }}
                                                    >
                                                        {page?.name}
                                                    </div>
                                                </Link>
                                            </Button>
                                        ))}
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
