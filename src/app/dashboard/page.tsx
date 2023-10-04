'use client'
import { FC, useEffect } from 'react'
import logo from '../../assets/logo/logo.png'
import { useLogicDashboard } from './logic'
import { Props } from './types'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import DashboardIcon from '@mui/icons-material/Dashboard'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import RssFeedIcon from '@mui/icons-material/RssFeed'
import LogoutIcon from '@mui/icons-material/Logout'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import FloatAddServices from '@/components/FloatButtonServices'
import CardDashboardServices from '@/components/CardDashboardServices'

const drawerWidth = 240

const ResponsiveDrawer: FC<Props> = props => {
    const {
        currentUser,
        getUserInfo,
        router,
        mobileOpen,
        handleDrawerToggle,
        route,
        changeRoute,
        logOut,
    } = useLogicDashboard()
    const { window } = props
    const container =
        window !== undefined ? () => window().document.body : undefined

    useEffect(() => {
        getUserInfo()
    }, [getUserInfo])

    useEffect(() => {
        if (currentUser && currentUser?.role !== 'admin') {
            router.push('/')
        }
    }, [currentUser, router])

    const itemsTop = [
        { text: 'Dashboard', icon: <DashboardIcon />, route: 'dashboard' },
        { text: 'Servicios', icon: <MedicalServicesIcon />, route: 'services' },
        { text: 'Blog', icon: <RssFeedIcon />, route: 'blog' }, // Cambia el ícono según lo necesites
    ]

    const drawer = (
        <div>
            <div
                style={{
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <img
                    src={logo.src}
                    alt=""
                    style={{
                        width: 187,
                        objectFit: 'cover',
                        backgroundSize: 'cover',
                    }}
                />
            </div>

            <Divider />
            <List>
                {itemsTop.map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={() => changeRoute(item.route)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={logOut}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cerrar sesión" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    )

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: 'black',
                }}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard - Farmacia Santa Bárbara
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                {route === 'dashboard' && (
                    // Aquí renderiza el contenido del dashboard
                    <Typography paragraph>Contenido del Dashboard</Typography>
                )}
                {route === 'services' && (
                    // Aquí renderiza el contenido de servicios
                    <>
                        <FloatAddServices />
                        <CardDashboardServices />
                        <Typography paragraph>
                            Contenido de Servicios
                        </Typography>
                    </>
                )}
                {route === 'blog' && (
                    // Aquí renderiza el contenido del blog
                    <Typography paragraph>Contenido del Blog</Typography>
                )}
            </Box>
        </Box>
    )
}

export default ResponsiveDrawer
