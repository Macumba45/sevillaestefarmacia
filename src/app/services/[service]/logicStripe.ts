import { useContext, useState } from 'react'
import { getServiceDetails } from '@/services/service'
import { stripePayment } from '@/services/stripe'
import { stripePaymentInProgress } from '@/services/payments'
import { useRouter } from 'next/navigation'
import { Services } from '../../../../types/types'
import { UserContext } from '../../../context/UserContext'

export const useLogicPageServicesDetail = () => {
    const { user } = useContext(UserContext)
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [serviceData, setServiceData] = useState<Services>()
    const [hourId, setHourId] = useState<string>('')
    const [dateId, setDateId] = useState<string>('')
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const fetchServiceDetails = async (id: string) => {
        setIsLoading(true)
        const serviceDetails = await getServiceDetails(id)
        if (typeof window !== 'undefined') {
            document.title = `Farmacia Santa Bárbara - ${serviceDetails?.title}`
        }
        setServiceData(serviceDetails)
        setIsLoading(false)
    }

    const onDateIdChange = (newDateIr: string) => {
        setDateId(newDateIr)
        setHourId('')
    }

    const contactWhatsApp = () => {
        const phoneNumber = '+34682734237'
        let whatsappURL = ''

        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            // Es un dispositivo móvil
            whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}`
        } else {
            // Es un escritorio
            whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}`
        }

        window.open(whatsappURL)
    }

    const handleReservarCita = async () => {
        try {
            setIsLoading(true)
            const userName = user?.name as string
            const priceService = serviceData?.price as string
            const userId = user?.id as string
            const serviceId = serviceData?.id as string
            const priceId = serviceData?.priceId as string
            const payment = await stripePaymentInProgress(
                userId,
                serviceId,
                dateId,
                hourId
            )
            const sessionData = await stripePayment(
                1,
                priceId,
                payment.id,
                serviceId,
                userName,
                priceService
            )
            router.push(sessionData.url)
        } catch (error) {
            console.error('Error al crear la sesión de pago: ', error)
        }
    }

    const goToLogin = () => {
        router.push('/auth/login')
    }

    return {
        contactWhatsApp,
        fetchServiceDetails,
        handleOpen,
        handleClose,
        handleReservarCita,
        isLoading,
        open,
        serviceData,
        setHourId,
        setDateId,
        onDateIdChange,
        goToLogin,
    }
}
