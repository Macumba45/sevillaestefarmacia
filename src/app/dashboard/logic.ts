import { useCallback, useState } from 'react'
import { getAuthenticatedToken } from '../../../storage/storage'
import { useRouter } from 'next/navigation'
import { Services, User } from '../../../types/types'

export const useLogicDashboard = () => {
    const [currentUser, setCurrentUser] = useState<User>()
    const [titleDrawer, setTitleDrawer] = useState<string>('Dashboard')
    const router = useRouter()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [route, setRoute] = useState('servicios')
    const titlePage = 'Dashboard'
    const [userLoaded, setUserLoaded] = useState(false)
    const [open, setOpen] = useState(false)
    const [services, setServices] = useState<Services[]>()
    const [openEditModal, setOpenEditModal] = useState(false)
    const [serviceData, setServiceData] = useState<Services>()
    const [isEditing, setIsEditing] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [serviceToDelete, setServiceToDelete] = useState('') // Almacena el id del servicio a eliminar

    const handleOpen = () => {
        setOpen(true)
        setIsEditing(false)
        setServiceData(undefined)
    }

    const openEditModalFunction = async (service: Services) => {
        setServiceData(service) // Almacena los datos en el estado
        setOpen(true)
        setIsEditing(true) // Abre el modal
    }
    const closeEditModalFunction = () => setOpenEditModal(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const changeRoute = (newRoute: string) => {
        setRoute(newRoute)
        setTitleDrawer(newRoute)
    }

    const logOut = () => {
        localStorage.removeItem('token')
        router.push('/dashboard/auth/login')
    }

    const handleDeleteClick = (id: string) => {
        // Abre el modal de confirmación y establece el id del servicio a eliminar
        setServiceToDelete(id)
        setOpenDeleteModal(true)
    }

    const closeModalDelete = () => {
        // Cierra el modal sin realizar la eliminación
        setOpenDeleteModal(false)
    }
    const handleConfirmDelete = () => {
        // Realiza la eliminación del servicio con el id almacenado en serviceToDelete
        deleteService(serviceToDelete)
        // Después de la eliminación, cierra el modal
        const updatedServices = services!.filter(
            service => service.id !== serviceToDelete
        )
        setServices(updatedServices)
        setOpenDeleteModal(false)
    }

    const getUserInfo = useCallback(async () => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
            const response = await fetch('/api/user/getUserInfo', {
                method: 'GET',
                headers,
            })
            if (response.ok) {
                const data = await response.json()
                setCurrentUser(data.user)
            } else {
                console.error('Error al obtener el usuario')
                router.push('/')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [router])

    const createService = useCallback(
        async (service: Services) => {
            try {
                const token = getAuthenticatedToken()
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
                const response = await fetch('/api/services/postService', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(service),
                })
                if (response.ok) {
                    const data: Services = await response.json()
                    return data
                } else {
                    console.error('Error al crear el servicio')
                }
            } catch (error) {
                console.error('Error al enviar el objeto:', error)
            } finally {
                router.push('/dashboard')
            }
        },
        [router]
    )

    const getServices = useCallback(async () => {
        try {
            const token = getAuthenticatedToken()
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
            const response = await fetch('/api/services/getService', {
                method: 'GET',
                headers,
            })
            if (response.ok) {
                const data: Services[] = await response.json()
                setServices(data)
                return data
            } else {
                console.error('Error al obtener los servicios')
            }
        } catch (error) {
            console.error('Error al enviar el objeto:', error)
        }
    }, [])

    const updateService = useCallback(
        async (service: Services) => {
            try {
                const token = getAuthenticatedToken()
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
                const response = await fetch('/api/services/updateService', {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify(service),
                })
                if (response.ok) {
                    const data: Services = await response.json()
                    return data
                } else {
                    console.error('Error al actualizar el servicio')
                }
            } catch (error) {
                console.error('Error al enviar el objeto:', error)
            } finally {
                router.push('/dashboard')
            }
        },
        [router]
    )

    const deleteService = useCallback(
        async (serviceId: string) => {
            try {
                const token = getAuthenticatedToken()
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
                const response = await fetch(
                    `/api/services/deleteService?id=${serviceId}`,
                    {
                        method: 'DELETE',
                        headers,
                    }
                )
                if (response.ok) {
                    const data: Services = await response.json()
                    console.log(data)
                    return data
                } else {
                    console.error('Error al eliminar el servicio')
                }
            } catch (error) {
                console.error('Error al enviar el objeto:', error)
            }
        },
        [router]
    )

    return {
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
        createService,
        getServices,
        services,
        setServices,
        openEditModal,
        openEditModalFunction,
        closeEditModalFunction,
        serviceData,
        updateService,
        isEditing,
        deleteService,
        openDeleteModal,
        closeModalDelete,
        handleConfirmDelete,
        handleDeleteClick,
    }
}
