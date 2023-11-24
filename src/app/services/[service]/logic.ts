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
        let message = ''
        const phoneNumber = '+34682734237'
        if (serviceData?.id === 'clo0e1q180006xy04pu96nyml') {
            message = `Hola Farmacia Santa Bárbara, me gustaría solicitar información sobre el servicio ${serviceData?.title}`
        } else if (serviceData?.id === 'clo0e0mn50003xy040gwqse36') {
            message =
                'Hola Farmacia Santa Bárbara, me gustaría solicitar presupuesto para realizar una fórmula magistral'
        }
        const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
            message
        )}`

        window.open(whatsappURL)
    }

    const handleReservarCita = async () => {
        try {
            setIsLoading(true)
            const userName = user?.name as string
            const priceService = serviceData?.price as string
            console.log(priceService)
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
            console.log(sessionData)
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
