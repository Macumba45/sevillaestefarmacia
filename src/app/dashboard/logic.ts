import { useCallback, useContext, useState } from 'react'
import { getAllUsers } from '@/services/user'
import { useRouter } from 'next/navigation'
import { Blogs, Payment, Services, Talleres, User } from '../../../types/types'
import { deleteDateById } from '@/services/dates'
import { createBlog, deleteBlog, getBlogs, updateBlog } from '@/services/blogs'
import { UserContext } from '@/context/UserContext'
import { deleteHourById } from '@/services/hours'
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
    const titlePage = 'Farmacia Sevilla Este Sta.Bárbara - Dashboard'
    const [openModalTallerOrBlog, setOpenModalTallerOrBlog] = useState(false)
    const [talleres, setTalleres] = useState<Talleres[] | undefined>([])
    const [tallerToDelete, setTallerToDelete] = useState('')
    const [tallerData, setTallerData] = useState<Talleres | undefined>()
    const [isEditingTaller, setIsEditingTaller] = useState(false)
    const [blogs, setBlogs] = useState<Blogs[] | undefined>([])
    const [isEditingBlog, setIsEditingBlog] = useState(false)
    const [blogToDelete, setBlogToDelete] = useState('')
    const [blogData, setBlogData] = useState<Blogs | undefined>()
    const [serviceDetails, setServiceDetails] = useState<Services>()
    const [openDeleteHour, setOpenDeleteHour] = useState(false)

    const datesPaymentsComing = allPayments?.filter((payment: any) => {
        if (!payment.date) {
            return false
        }

        let dateString = payment.date.dates // "30/11/2023"
        let dateParts = dateString.split('/')
        let paymentDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0]
        ) // Los meses son 0-indexados en JavaScript

        return (
            payment.payed === true &&
            payment.dateId !== '' &&
            paymentDate >= new Date()
        )
    })

    const datesPaymentsPassed = allPayments?.filter((payment: any) => {
        if (!payment.date) {
            return false
        }

        let dateString = payment.date.dates // "30/11/2023"
        let dateParts = dateString.split('/')
        let paymentDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0]
        ) // Los meses son 0-indexados en JavaScript

        return (
            payment.payed === true &&
            payment.dateId !== '' &&
            paymentDate < new Date()
        )
    })
    datesPaymentsPassed?.sort(comparePaymentsReverse)

    const paymentsNoDate = allPayments
        ?.filter((payment: any) => {
            return payment.payed === true && payment.dateId === ''
        })
        .sort(compareDatesCreatedAt)

    function compareDatesCreatedAt(a: any, b: any) {
        // Convertir las fechas a objetos Date
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)

        // Comparar fechas
        if (dateA > dateB) return -1
        if (dateA < dateB) return 1

        return 0
    }

    // Función de comparación personalizada para ordenar por fecha y luego por hora
    function comparePayments(a: any, b: any) {
        // Convertir las fechas a objetos Date
        const dateA = new Date(
            a.date!.dates.split('/').reverse().join('-') + 'T00:00:00'
        )
        const dateB = new Date(
            b.date!.dates.split('/').reverse().join('-') + 'T00:00:00'
        )

        // Comparar fechas
        if (dateA < dateB) return -1
        if (dateA > dateB) return 1

        // Si las fechas son iguales, comparar horas
        const hourA = a.hour!.hour
        const hourB = b.hour!.hour
        if (hourA < hourB) return -1
        if (hourA > hourB) return 1

        return 0
    }

    function comparePaymentsReverse(a: any, b: any) {
        // Convertir las fechas a objetos Date
        const dateA = new Date(
            a.date!.dates.split('/').reverse().join('-') + 'T00:00:00'
        )
        const dateB = new Date(
            b.date!.dates.split('/').reverse().join('-') + 'T00:00:00'
        )

        // Comparar fechas
        if (dateA > dateB) return -1
        if (dateA < dateB) return 1

        // Si las fechas son iguales, comparar horas
        const hourA = a.hour!.hour
        const hourB = b.hour!.hour
        if (hourA > hourB) return -1
        if (hourA < hourB) return 1

        return 0
    }

    // Ordena los elementos por fecha y luego por hora
    datesPaymentsComing?.sort(comparePayments)

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
        window.location.reload()
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
        router.push('/auth/login')
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

    const handleDeleteHourId = (serviceId: string, hourId: string) => {
        setOpenDeleteHour(true)

        setServices(services => {
            // Encuentra el servicio correcto
            const serviceIndex = services!.findIndex(
                service => service.id === serviceId
            )
            if (serviceIndex === -1) {
                console.error(
                    `No se encontró el servicio con el id ${serviceId}`
                )
                return services
            }

            // Crea una copia del servicio para no mutar el estado directamente
            const service = { ...services![serviceIndex] }

            // Encuentra y elimina la hora correcta
            service.dates!.forEach(date => {
                const hourIndex = date.hours.findIndex(
                    hour => hour.id === hourId
                )
                if (hourIndex !== -1) {
                    date.hours.splice(hourIndex, 1)
                }
            })

            confirmateDeleteHour(hourId)

            // Reemplaza el servicio en el array y devuelve el nuevo estado
            return [
                ...services!.slice(0, serviceIndex),
                service,
                ...services!.slice(serviceIndex + 1),
            ]
        })

    }
    const handleCloseModalHour = () => {
        setOpenDeleteHour(false)
    }

    const confirmateDeleteHour = async (hourId: string) => {
        await deleteHourById(hourId)
        setOpenDeleteHour(false)
    }

    const closeModalDelete = () => {
        // Cierra el modal sin realizar la eliminación
        setOpenDeleteModal(false)
    }

    const openEditModalDateAndHour = async (service: Services) => {
        setOpenModalEditDateAndHour(true)
        setServiceData(service) // Almacena los datos en el estado
        const serviceDetails = await getServiceDetails(
            service.service?.id as string
        )
        setServiceDetails(serviceDetails)
        setPaymentId(service.id as string)
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
        datesPaymentsComing,
        datesPaymentsPassed,
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
        handleDeleteHourId,
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
        paymentsNoDate,
        postNewBlog,
        postNewTaller,
        route,
        router,
        serviceData,
        serviceDetails,
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
        openDeleteHour,
        handleCloseModalHour,
        confirmateDeleteHour,
    }
}
