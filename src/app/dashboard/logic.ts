import { useCallback, useState } from 'react'
import { getAllUsers, getUserInfo } from '@/services/user'
import { useRouter } from 'next/navigation'
import { Services, Talleres, User } from '../../../types/types'
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
import {
    createTaller,
    deleteTaller,
    getTalleres,
    updateTaller,
} from '@/services/talleres'
import { deleteDateById } from '@/services/dates'

export const useLogicDashboard = () => {
    const [currentUser, setCurrentUser] = useState<User>()
    const [allUsers, setAllUsers] = useState<User[]>([])
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
    const [isLoadingButton, setIsLoadingButton] = useState(false)
    const titlePage = 'Dashboard'
    const datesPaymentsPayed = allPayments?.filter(
        (payment: any) => payment.payed === true
    )
    const [openModalTallerOrBlog, setOpenModalTallerOrBlog] = useState(false)
    const [talleres, setTalleres] = useState<Talleres[] | undefined>([])
    const [tallerToDelete, setTallerToDelete] = useState('')
    const [tallerData, setTallerData] = useState<Talleres>()
    const [isEditingTaller, setIsEditingTaller] = useState(false)

    const fetchAllUsers = useCallback(async () => {
        setIsLoading(true)
        const users = await getAllUsers()
        setAllUsers(users as User[])
        setIsLoading(false)
        return
    }, [])

    const getUserInfoData = useCallback(async () => {
        setIsLoading(true)
        const userInfo = await getUserInfo()
        setCurrentUser(userInfo as User)
        setIsLoading(false)
    }, [])

    const createNewService = useCallback(async (service: Services) => {
        setIsLoadingButton(true)
        const createdService = await createService(service)
        setIsLoadingButton(false)
        setIsLoading(false)
        return createdService
    }, [])

    const getServiceData = useCallback(async () => {
        setIsLoading(true)
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
        setIsLoadingButton(true)
        await updateService(service)
        setIsLoadingButton(false)
        return
    }, [])

    const getAllPayments = useCallback(async () => {
        setIsLoading(true)
        const payments = await fetchPaymentsData()
        setAllPayments(payments)
        setIsLoading(false)
        return payments
    }, [])

    const editDateAndHour = useCallback(
        async (paymentId: string, dateId: string, hourId: string) => {
            setIsLoadingButton(true)
            await editDateAndHourFromPayments(paymentId, dateId, hourId)
            setIsLoadingButton(false)
            setOpenModalEditDateAndHour(false)
            return
        },
        []
    )

    const fetchTalleres = async () => {
        setIsLoading(true)
        const talleres = await getTalleres()
        setTalleres(talleres)
        setIsLoading(false)
        return talleres
    }

    const postNewTaller = async (taller: Talleres) => {
        const newTaller = await createTaller(taller)
        return newTaller
    }

    const deteleTallerById = async (id: string) => {
        const deteleItem = deleteTaller(id)
        return deteleItem
    }

    const updateTallerById = async (taller: Talleres) => {
        const updateItem = await updateTaller(taller)
        return updateItem
    }

    const deleteDate = async (dateId: string) => {
        await deleteDateById(dateId)
        return
    }

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

    const handleOpenModalTallerOrBlog = () => {
        setOpenModalTallerOrBlog(true)
        setIsEditingTaller(false)
        setTallerData(undefined)
    }

    const handleCloseModalTallerOrBlog = () => {
        setOpenModalTallerOrBlog(false)
    }

    const handleConfirmTaller = () => {
        // Realiza la eliminación del servicio con el id almacenado en serviceToDelete
        deteleTallerById(tallerToDelete)
        // Después de la eliminación, cierra el modal
        const updatedTalleres = talleres!.filter(
            talleres => talleres.id !== tallerToDelete
        )
        setTalleres(updatedTalleres)
        setOpenDeleteModal(false)
    }

    const handleDeleteClickTaller = (id: string) => {
        // Abre el modal de confirmación y establece el id del servicio a eliminar
        console.log(id)
        setTallerToDelete(id)
        setOpenDeleteModal(true)
    }

    const openEditModalFunctionTaller = async (taller: Talleres) => {
        setTallerData(taller)
        setOpenModalTallerOrBlog(true)
        setIsEditingTaller(true)
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
        isLoadingButton,
        datesPaymentsPayed,
        fetchAllUsers,
        allUsers,
        openModalTallerOrBlog,
        handleOpenModalTallerOrBlog,
        handleCloseModalTallerOrBlog,
        postNewTaller,
        deteleTallerById,
        updateTallerById,
        fetchTalleres,
        talleres,
        handleDeleteClickTaller,
        handleConfirmTaller,
        tallerData,
        openEditModalFunctionTaller,
        isEditingTaller,
        deleteDate,
    }
}
