import { useCallback, useState } from 'react'
import { getUserInfo } from '@/services/user'
import { useRouter } from 'next/navigation'
import { Services, User } from '../../../types/types'
import {
    createService,
    getServices,
    updateService,
    deleteService,
} from '@/services/service'
import {
    editDateAndHourFromPayments,
    fetchPaymentsData,
} from '@/services/payments'

export const useLogicDashboard = () => {
    const [currentUser, setCurrentUser] = useState<User>()
    const [allPayments, setAllPayments] = useState<Services[]>([])
    const [titleDrawer, setTitleDrawer] = useState<string>('servicios')
    const router = useRouter()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [route, setRoute] = useState('servicios')
    const [userLoaded, setUserLoaded] = useState(false)
    const [open, setOpen] = useState(false)
    const [services, setServices] = useState<Services[]>()
    const [openEditModal, setOpenEditModal] = useState(false)
    const [serviceData, setServiceData] = useState<Services>()
    const [isEditing, setIsEditing] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [serviceToDelete, setServiceToDelete] = useState('') // Almacena el id del servicio a eliminar
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [openModalEditDateAndHour, setOpenModalEditDateAndHour] =
        useState(false)
    const [hourId, setHourId] = useState<string>('')
    const [dateId, setDateId] = useState<string>('')
    const [paymentId, setPaymentId] = useState<string>('')
    const titlePage = 'Dashboard'

    const getUserInfoData = useCallback(async () => {
        setIsLoading(true)
        const userInfo = await getUserInfo()
        setCurrentUser(userInfo as User)
    }, [])

    const createNewService = useCallback(async (service: Services) => {
        const createdService = await createService(service)
        return createdService
    }, [])

    const getServiceData = useCallback(async () => {
        const services = await getServices()
        setServices(services)
        setIsLoading(false)
        return services
    }, [])

    const deleteServiceID = useCallback(async (serviceId: string) => {
        await deleteService(serviceId)
        return
    }, [])

    const updateServiceData = useCallback(async (service: Services) => {
        await updateService(service)
        return
    }, [])

    const getAllPayments = useCallback(async () => {
        const payments = await fetchPaymentsData()
        setAllPayments(payments)
        return payments
    }, [])

    const editDateAndHour = useCallback(
        async (paymentId: string, dateId: string, hourId: string) => {
            await editDateAndHourFromPayments(paymentId, dateId, hourId)
            setOpenModalEditDateAndHour(false)
            return
        },
        []
    )

    const handleOpenModaService = () => {
        setOpen(true)
        setIsEditing(false)
        setServiceData(undefined)
    }

    const openEditModalFunction = async (service: Services) => {
        setServiceData(service)
        setOpen(true)
        setIsEditing(true)
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

    const handleConfirmDelete = () => {
        // Realiza la eliminación del servicio con el id almacenado en serviceToDelete
        deleteServiceID(serviceToDelete)
        // Después de la eliminación, cierra el modal
        const updatedServices = services!.filter(
            service => service.id !== serviceToDelete
        )
        setServices(updatedServices)
        setOpenDeleteModal(false)
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

    const openEditModalDateAndHour = async (service: Services) => {
        setServiceData(service) // Almacena los datos en el estado
        setPaymentId(service.id as string)
        setOpenModalEditDateAndHour(true)
        setIsEditing(true)
    }

    const openModalEditDateAndHourFunction = () => {
        setOpenModalEditDateAndHour(true)
    }

    const closeModalEditDateAndHourFunction = () => {
        setOpenModalEditDateAndHour(false)
    }

    return {
        allPayments,
        changeRoute,
        closeEditModalFunction,
        closeModalDelete,
        closeModalEditDateAndHourFunction,
        createNewService,
        currentUser,
        dateId,
        editDateAndHour,
        getAllPayments,
        getServiceData,
        getUserInfoData,
        handleConfirmDelete,
        handleDeleteClick,
        handleDrawerToggle,
        handleOpenModaService,
        hourId,
        isEditing,
        isLoading,
        logOut,
        mobileOpen,
        open,
        openDeleteModal,
        openEditModal,
        openEditModalDateAndHour,
        openEditModalFunction,
        openModalEditDateAndHour,
        openModalEditDateAndHourFunction,
        paymentId,
        route,
        router,
        serviceData,
        services,
        setDateId,
        setHourId,
        setOpen,
        setServices,
        setUserLoaded,
        titleDrawer,
        titlePage,
        updateServiceData,
        userLoaded,
    }
}
