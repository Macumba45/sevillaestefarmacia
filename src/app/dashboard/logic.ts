import { useCallback, useContext, useState } from 'react'
import { getAllUsers } from '@/services/user'
import { useRouter } from 'next/navigation'
import { Blogs, Services, Talleres, User } from '../../../types/types'
import { deleteDateById } from '@/services/dates'
import { createBlog, deleteBlog, getBlogs, updateBlog } from '@/services/blogs'
import { UserContext } from '@/context/UserContext'
import {
    createService,
    getServices,
    updateService,
    deleteService,
    getServiceDetails,
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

export const useLogicDashboard = () => {
    const { user } = useContext(UserContext)
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
        (payment: any) => payment.payed === true && payment.dateId !== ''
    )
    const [openModalTallerOrBlog, setOpenModalTallerOrBlog] = useState(false)
    const [talleres, setTalleres] = useState<Talleres[] | undefined>([])
    const [tallerToDelete, setTallerToDelete] = useState('')
    const [tallerData, setTallerData] = useState<Talleres | undefined>()
    const [isEditingTaller, setIsEditingTaller] = useState(false)
    const [blogs, setBlogs] = useState<Blogs[] | undefined>([])
    const [isEditingBlog, setIsEditingBlog] = useState(false)
    const [blogToDelete, setBlogToDelete] = useState('')
    const [blogData, setBlogData] = useState<Blogs | undefined>()
    const [serviceDataId, setServiceDataId] = useState<string>('')
    const [serviceDetails, setServiceDetails] = useState<Services>()

    const fetchAllUsers = useCallback(async () => {
        setIsLoading(true)
        const users = await getAllUsers()
        setAllUsers(users as User[])
        setIsLoading(false)
        return
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
        setTalleres(talleres as Talleres[])
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
    const fetchBlogs = async () => {
        setIsLoading(true)
        const blogs = await getBlogs()
        setBlogs(blogs as Blogs[])
        setIsLoading(false)
        return blogs
    }

    const postNewBlog = async (blog: Blogs) => {
        const newBlog = await createBlog(blog)
        return newBlog
    }

    const deteleBlogById = async (id: string) => {
        const deteleItem = deleteBlog(id)
        return deteleItem
    }

    const updateBlogById = async (blog: Blogs) => {
        const updateItem = await updateBlog(blog)
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
        console.log(service)
        setServiceDataId(service.service?.id as string)
        const serviceDetails = await getServiceDetails(
            service.service?.id as string
        )
        setServiceDetails(serviceDetails)
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

    const handleOpenModalTaller = () => {
        setTallerData(undefined)
        setOpenModalTallerOrBlog(true)
        setIsEditingTaller(false)
    }

    const handleOpenModalBlog = () => {
        setTallerData(undefined)
        setOpenModalTallerOrBlog(true)
        setIsEditingBlog(false)
    }

    const handleCloseModalTaller = () => {
        setTallerData(undefined)
        setOpenModalTallerOrBlog(false)
    }
    const handleCloseModalBlog = () => {
        setTallerData(undefined)
        setOpenModalTallerOrBlog(false)
    }

    const handleConfirmDeleteTaller = () => {
        // Realiza la eliminación del servicio con el id almacenado en serviceToDelete
        deteleTallerById(tallerToDelete)
        // Después de la eliminación, cierra el modal
        const updatedTalleres = talleres!.filter(
            talleres => talleres.id !== tallerToDelete
        )
        setTalleres(updatedTalleres)
        setOpenDeleteModal(false)
    }
    const handleConfirmDeleteBlog = () => {
        // Realiza la eliminación del servicio con el id almacenado en serviceToDelete
        deteleBlogById(blogToDelete)
        // Después de la eliminación, cierra el modal
        const updatedBlogs = blogs!.filter(blogs => blogs.id !== blogToDelete)
        setTalleres(updatedBlogs)
        setOpenDeleteModal(false)
    }

    const handleDeleteClickTaller = (id: string) => {
        // Abre el modal de confirmación y establece el id del servicio a eliminar
        setTallerToDelete(id)
        setOpenDeleteModal(true)
    }
    const handleDeleteClickBlog = (id: string) => {
        // Abre el modal de confirmación y establece el id del servicio a eliminar
        setBlogToDelete(id)
        setOpenDeleteModal(true)
    }

    const openEditModalFunctionTaller = async (taller: Talleres) => {
        setTallerData(taller)
        setOpenModalTallerOrBlog(true)
        setIsEditingTaller(true)
    }

    const openEditModalFunctionBlog = async (blog: Blogs) => {
        setBlogData(blog)
        setOpenModalTallerOrBlog(true)
        setIsEditingBlog(true)
    }

    return {
        allPayments,
        allUsers,
        blogData,
        blogs,
        changeRoute,
        closeEditModalFunction,
        closeModalDelete,
        closeModalEditDateAndHourFunction,
        createNewService,
        dateId,
        datesPaymentsPayed,
        deleteDate,
        deteleTallerById,
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
        openEditModal,
        openEditModalDateAndHour,
        openEditModalFunction,
        openEditModalFunctionBlog,
        openEditModalFunctionTaller,
        openModalEditDateAndHour,
        openModalEditDateAndHourFunction,
        openModalTallerOrBlog,
        paymentId,
        postNewBlog,
        postNewTaller,
        route,
        router,
        serviceData,
        services,
        setDateId,
        setHourId,
        setOpen,
        setServices,
        setUserLoaded,
        tallerData,
        talleres,
        titleDrawer,
        titlePage,
        updateBlogById,
        updateServiceData,
        updateTallerById,
        user,
        userLoaded,
        serviceDataId,
        serviceDetails,
    }
}
