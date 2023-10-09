'use client'
import { FC, useEffect } from 'react'
import { useLogicDashboard } from './logic'
import { CardServicesContainer, CitasContainer } from './styles'
import { Props } from './types'
import logo from '../../assets/logo/logo.png'
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
import DateRangeIcon from '@mui/icons-material/DateRange'
import AlignItemsList from '@/components/ListDateAvatar'
import DatePickerComp from '@/components/InputDayPicker'
import SearchInputComp from '@/components/InpuntSearch'
import ServiceFormModal from '@/components/ModalServices'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

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
        titlePage,
        titleDrawer,
        open,
        setOpen,
        handleOpen,
        userLoaded,
        setUserLoaded,
        getServices,
        services,
        openEditModalFunction,
        serviceData,
        isEditing,
    } = useLogicDashboard()
    const { window } = props
    const container =
        window !== undefined ? () => window().document.body : undefined

    useEffect(() => {
        getUserInfo()
        getServices()
    }, [getUserInfo, getServices])

    useEffect(() => {
        if (currentUser && userLoaded) {
            if (currentUser.role !== 'admin') {
                router.push('/')
            }
        }
    }, [currentUser, userLoaded, router])

    useEffect(() => {
        if (currentUser) {
            setUserLoaded(true)
        }
    }, [currentUser, setUserLoaded])

    useEffect(() => {
        document.title = titlePage
    }, [titlePage])

    const itemsTop = [
        { text: 'Dashboard', icon: <DashboardIcon />, route: 'dashboard' },
        {
            text: 'Servicios',
            icon: <MedicalServicesIcon />,
            route: 'servicios',
        },
        { text: 'Blog', icon: <RssFeedIcon />, route: 'blog' },
        { text: 'Próximas citas', icon: <DateRangeIcon />, route: 'citas' },
        { text: 'Clientes', icon: <AccountCircleIcon />, route: 'clientes' },
    ]

    const drawer = (
        <div>
            <div
                style={{
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    boxShadow:
                        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
                }}
            >
                <img
                    src={logo.src}
                    alt=""
                    style={{
                        width: 185,
                        objectFit: 'cover',
                        backgroundSize: 'cover',
                    }}
                />
            </div>

            <Divider />
            <List>
                {itemsTop.map(item => (
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
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {titleDrawer.toLocaleUpperCase()} - Farmacia Santa
                        Bárbara
                    </Typography>
                    <Typography
                        fontSize={15}
                        fontWeight={400}
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        {currentUser?.email}
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
                {route === 'servicios' && (
                    // Aquí renderiza el contenido de servicios
                    <CardServicesContainer>
                        <FloatAddServices onClick={handleOpen} />
                        {open && (
                            <ServiceFormModal
                                open={open}
                                onClose={() => setOpen(false)}
                                isEditing={isEditing}
                                serviceData={serviceData}
                            />
                        )}
                        {services?.length === 0 ? (
                            <Typography
                                sx={{
                                    textAlign: 'center',
                                    fontSize: '1.2rem',
                                    fontWeight: 600,
                                    marginTop: '1rem',
                                }}
                            >
                                No hay servicios disponibles
                            </Typography>
                        ) : (
                            services?.map(item => (
                                <CardDashboardServices
                                    service={item}
                                    key={item.id}
                                    onEdit={() => openEditModalFunction(item)}
                                />
                            ))
                        )}
                    </CardServicesContainer>
                )}
                {route === 'citas' && (
                    <CitasContainer>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                width: '100%',
                                height: 80,
                                marginLeft: 40,
                            }}
                        >
                            <DatePickerComp />
                            <SearchInputComp />
                        </div>

                        <AlignItemsList
                            serviceType="Pendientes"
                            user="Juan Rodriguez"
                            date="12/12/2021 a las 12:00"
                            phone="123456789"
                        />
                        <AlignItemsList
                            serviceType="Pendientes"
                            user="Pedro Rodriguez"
                            date="12/12/2021 a las 12:00"
                            phone="123456789"
                        />
                        <AlignItemsList
                            serviceType="Pendientes"
                            user="Juan Rodriguez"
                            date="12/12/2021 a las 12:00"
                            phone="123456789"
                        />
                        <AlignItemsList
                            serviceType="Pendientes"
                            user="Ana Rodriguez"
                            date="12/12/2021 a las 12:00"
                            phone="123456789"
                        />
                        <AlignItemsList
                            serviceType="Pendientes"
                            user="Ramon Rodriguez"
                            date="12/12/2021 a las 12:00"
                            phone="123456789"
                        />
                        <AlignItemsList
                            serviceType="Pendientes"
                            user="Pepe Rodriguez"
                            date="12/12/2021 a las 12:00"
                            phone="123456789"
                        />
                        <AlignItemsList
                            serviceType="Pendientes"
                            user="Gonzalo Rodriguez"
                            date="12/12/2021 a las 12:00"
                            phone="123456789"
                        />
                    </CitasContainer>
                )}
                {route === 'blog' && (
                    <>
                        <FloatAddServices onClick={handleOpen} />
                        {/* {open && (
                            <ServiceFormModal
                                open={open}
                                onClose={() => setOpen(false)}
                            />
                        )} */}
                    </>
                )}
                {route === 'clientes' && (
                    <>
                        <FloatAddServices onClick={handleOpen} />
                        {/* {open && (
                            <ServiceFormModal
                                open={open}
                                onClose={() => closeEditModalFunction()}
                            />
                        )} */}
                    </>
                )}
            </Box>
        </Box>
    )
}

export default ResponsiveDrawer
