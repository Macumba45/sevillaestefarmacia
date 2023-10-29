'use client'
import { FC, memo, useEffect } from 'react'
import { useLogicDashboard } from './logic'
import { getAuthenticatedToken } from '../../../storage/storage'
import { Props } from './types'
import Link from 'next/link'
import { Blogs, Talleres } from '../../../types/types'
import ModalOrderTime from '@/components/ModalOrderTime'
import LinearIndeterminate from '@/components/LoaderLinear/indx'
import logo from '../../assets/logo/logo.png'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import HubIcon from '@mui/icons-material/Hub'
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
import DeleteConfirmationModal from '@/components/ModalConfirmationDelete'
import UserAvatar from '@/components/UserAvatar'
import CreateTallerModal from '@/components/ModalTaller'
import CardDashboardTalleres from '@/components/CardDashboardTalleres'
import CardDashboardblogs from '@/components/CardDashboardBlogs'
import CreateBlogModal from '@/components/ModalBlog'
import {
    CardBlogsContainer,
    CardServicesContainer,
    CardTalleresContainer,
    CitasContainer,
    LoadingContainer,
} from './styles'

const drawerWidth = 240

const Dashboard: FC<Props> = () => {
    const {
        allUsers,
        blogs,
        changeRoute,
        closeModalDelete,
        closeModalEditDateAndHourFunction,
        dateId,
        datesPaymentsPayed,
        editDateAndHour,
        fetchAllUsers,
        fetchBlogs,
        fetchTalleres,
        getAllPayments,
        getServiceData,
        handleCloseModalBlog,
        handleCloseModalTaller,
        handleConfirmDelete,
        handleConfirmDeleteBlog,
        handleConfirmDeleteTaller,
        handleDeleteClick,
        handleDeleteClickBlog,
        handleDeleteClickTaller,
        handleDrawerToggle,
        handleOpenModalBlog,
        handleOpenModalTaller,
        handleOpenModaService,
        hourId,
        isEditing,
        isEditingBlog,
        isEditingTaller,
        isLoading,
        isLoadingButton,
        logOut,
        mobileOpen,
        open,
        openDeleteModal,
        openEditModalDateAndHour,
        openEditModalFunction,
        openEditModalFunctionBlog,
        openEditModalFunctionTaller,
        openModalEditDateAndHour,
        openModalTallerOrBlog,
        paymentId,
        route,
        router,
        serviceData,
        services,
        setDateId,
        setHourId,
        setOpen,
        setUserLoaded,
        tallerData,
        talleres,
        titleDrawer,
        titlePage,
        userLoaded,
        blogData,
        user,
    } = useLogicDashboard()

    const itemsTop = [
        // { text: 'Dashboard', icon: <DashboardIcon />, route: 'dashboard' },
        {
            text: 'Servicios',
            icon: <MedicalServicesIcon />,
            route: 'servicios',
        },
        {
            text: 'Próximas citas',
            icon: <DateRangeIcon />,
            route: 'citas',
        },
        {
            text: 'Talleres',
            icon: <HubIcon />,
            route: 'talleres',
        },
        {
            text: 'Blog',
            icon: <RssFeedIcon />,
            route: 'blog',
        },
        {
            text: 'Mis clientes',
            icon: <AccountCircleIcon />,
            route: 'clientes',
        },
    ]

    const drawer = (
        <div>
            <div
                style={{
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    height: '64px',
                    boxShadow:
                        '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
                }}
            >
                <Link href="/" style={undefined}>
                    <img
                        src={logo.src}
                        alt="Farmacia Sta Bárbara"
                        style={{
                            width: 175,
                            objectFit: 'cover',
                            backgroundSize: 'cover',
                        }}
                    />
                </Link>
            </div>

            <Divider />
            <List>
                {itemsTop.map(item => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                changeRoute(item.route)
                            }}
                        >
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

    useEffect(() => {
        if (route === 'servicios') {
            getServiceData()
        } else if (route === 'talleres') {
            fetchTalleres()
        } else if (route === 'clientes') {
            fetchAllUsers()
        } else if (route === 'citas') {
            getAllPayments()
        } else if (route === 'blog') {
            fetchBlogs()
        }
    }, [route])

    useEffect(() => {
        if (user?.role && userLoaded && getAuthenticatedToken()) {
            if (user.role !== 'admin') {
                router.push('/')
            }
        }
    }, [user, userLoaded, router])

    useEffect(() => {
        if (user) {
            setUserLoaded(true)
        }
    }, [user, setUserLoaded])

    useEffect(() => {
        document.title = titlePage
    }, [titlePage])

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
                        {titleDrawer.toLocaleUpperCase()} - Farmacia Sta Bárbara
                    </Typography>
                    <Typography
                        fontSize={15}
                        fontWeight={400}
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        {user?.email}
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
                    component={'div'}
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

                <div>
                    {/* {route === 'dashboard' && (
                        <Typography paragraph>
                            Contenido del Dashboard
                        </Typography>
                    )} */}
                    {route === 'servicios' && (
                        <>
                            {isLoading ? (
                                <LoadingContainer>
                                    <LinearIndeterminate
                                        label="Cargando datos en el sistema..."
                                        width={400}
                                    />
                                </LoadingContainer>
                            ) : (
                                <CardServicesContainer>
                                    <FloatAddServices
                                        onClick={() => handleOpenModaService()}
                                    />
                                    {open && (
                                        <ServiceFormModal
                                            open={open}
                                            onClose={() => setOpen(false)}
                                            isEditing={isEditing}
                                            serviceData={serviceData}
                                        />
                                    )}
                                    {services &&
                                        services?.map(item => (
                                            <CardDashboardServices
                                                service={item}
                                                key={item.id}
                                                onEdit={() =>
                                                    openEditModalFunction(item)
                                                }
                                                onDelete={() =>
                                                    handleDeleteClick(
                                                        item.id as string
                                                    )
                                                }
                                            />
                                        ))}
                                    {openDeleteModal && (
                                        <DeleteConfirmationModal
                                            open={openDeleteModal}
                                            onClose={closeModalDelete}
                                            onDelete={handleConfirmDelete}
                                        />
                                    )}
                                </CardServicesContainer>
                            )}
                        </>
                    )}
                    {route === 'citas' && (
                        <CitasContainer>
                            {isLoading ? (
                                <LoadingContainer>
                                    <LinearIndeterminate
                                        label="Cargando datos en el sistema..."
                                        width={400}
                                    />
                                </LoadingContainer>
                            ) : (
                                datesPaymentsPayed.map((item: any, index) => (
                                    <AlignItemsList
                                        key={index}
                                        serviceType={item.service.title}
                                        user={item.user.name}
                                        date={item.date ? item.date.dates : ''}
                                        hour={item.hour ? item.hour.hour : ''}
                                        phone={item.user.phone}
                                        openEditModalDateAndHour={() =>
                                            openEditModalDateAndHour(item)
                                        }
                                        // unBookDate={() =>
                                        //     deleteDate(item.dateId)
                                        // }
                                    />
                                ))
                            )}
                            <ModalOrderTime
                                isLoading={isLoadingButton}
                                open={openModalEditDateAndHour}
                                handleClose={closeModalEditDateAndHourFunction}
                                dates={serviceData?.service?.dates?.map(
                                    (item: any) => ({
                                        ...item,
                                        date: item.dates,
                                    })
                                )}
                                handleReservarCita={handleOpenModaService}
                                onHourIdChange={newHourId => {
                                    setHourId(newHourId)
                                }}
                                onDateIdChange={newDateIr => {
                                    setDateId(newDateIr)
                                }}
                                editDateAndHour={() =>
                                    editDateAndHour(paymentId, hourId, dateId)
                                }
                                isEditing={true}
                            />
                        </CitasContainer>
                    )}
                    {route === 'clientes' && (
                        <>
                            {isLoading ? (
                                <LoadingContainer>
                                    <LinearIndeterminate
                                        label="Cargando datos en el sistema..."
                                        width={400}
                                    />
                                </LoadingContainer>
                            ) : (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {allUsers &&
                                        allUsers.map((item: any, index) => (
                                            <UserAvatar
                                                user={item}
                                                key={index}
                                            />
                                        ))}
                                </div>
                            )}
                        </>
                    )}

                    {route === 'blog' && (
                        <CardBlogsContainer>
                            <FloatAddServices onClick={handleOpenModalBlog} />
                            <CreateBlogModal
                                onClose={handleCloseModalBlog}
                                open={openModalTallerOrBlog}
                                isEditing={isEditingBlog}
                                blog={blogData as Blogs}
                            />
                            {isLoading ? (
                                <LoadingContainer>
                                    <LinearIndeterminate
                                        label="Cargando datos en el sistema..."
                                        width={400}
                                    />
                                </LoadingContainer>
                            ) : (
                                blogs?.map(blog => (
                                    <CardDashboardblogs
                                        key={blog.id}
                                        blogs={blog}
                                        onDelete={() =>
                                            handleDeleteClickBlog(
                                                blog.id as string
                                            )
                                        }
                                        onEdit={() =>
                                            openEditModalFunctionBlog(blog)
                                        }
                                    />
                                ))
                            )}
                            {openDeleteModal && (
                                <DeleteConfirmationModal
                                    open={openDeleteModal}
                                    onClose={closeModalDelete}
                                    onDelete={handleConfirmDeleteBlog}
                                />
                            )}
                        </CardBlogsContainer>
                    )}
                    {route === 'talleres' && (
                        <CardTalleresContainer>
                            <FloatAddServices onClick={handleOpenModalTaller} />
                            <CreateTallerModal
                                onClose={handleCloseModalTaller}
                                open={openModalTallerOrBlog}
                                isEditing={isEditingTaller}
                                taller={tallerData as Talleres}
                            />
                            {isLoading ? (
                                <LoadingContainer>
                                    <LinearIndeterminate
                                        label="Cargando datos en el sistema..."
                                        width={400}
                                    />
                                </LoadingContainer>
                            ) : (
                                talleres?.map(taller => (
                                    <CardDashboardTalleres
                                        key={taller.id}
                                        talleres={taller}
                                        onDelete={() =>
                                            handleDeleteClickTaller(
                                                taller.id as string
                                            )
                                        }
                                        onEdit={() =>
                                            openEditModalFunctionTaller(taller)
                                        }
                                    />
                                ))
                            )}
                            {openDeleteModal && (
                                <DeleteConfirmationModal
                                    open={openDeleteModal}
                                    onClose={closeModalDelete}
                                    onDelete={handleConfirmDeleteTaller}
                                />
                            )}
                        </CardTalleresContainer>
                    )}
                </div>
            </Box>
        </Box>
    )
}

export default memo(Dashboard)
