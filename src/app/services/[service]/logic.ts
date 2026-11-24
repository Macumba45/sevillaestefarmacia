import { useContext, useState } from 'react'
import { getServiceDetails } from '@/services/service'
import { stripePayment } from '@/services/stripe'
import { stripePaymentInProgress } from '@/services/payments'
import { useRouter } from 'next/navigation'
import { Services } from '../../../../types/types'
import { UserContext } from '../../../context/UserContext'
import { notification } from 'antd'
import { getAuthenticatedToken } from '../../../../storage/storage'

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
        // const phoneNumber = '+34682296561'
        // let whatsappURL = ''

        // if (
        //     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        //         navigator.userAgent
        //     )
        // ) {
        //     // Es un dispositivo móvil
        //     whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}`
        // } else {
        //     // Es un escritorio
        //     whatsappURL = `https://web.whatsapp.com/send?phone=${phoneNumber}`
        // }

        // window.open(whatsappURL)

        const phoneNumber = '+34682296561'
        let whatsappURL = ''
        whatsappURL = `https://wa.me/${phoneNumber}`
        // if (navigator.userAgent.includes('Instagram')) {
        //     whatsappURL = `https://wa.me/${phoneNumber}`
        // }

        window.open(whatsappURL)
    }

    const handleReservarCita = async () => {
        setIsLoading(true)
        try {
            const payment = await stripePaymentInProgress(
                user?.id as string,
                serviceData?.id as string,
                dateId,
                hourId
            )
            if (!payment?.id) throw new Error('No se pudo crear el pago')
            const response = await fetch('/api/redsys/paymentRedsys', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getAuthenticatedToken()}`,
                },
                body: JSON.stringify({ paymentId: payment.id }),
            })
            if (!response.ok) throw new Error('No se pudo iniciar el pago')
            document.body.innerHTML = await response.text()
        } catch (error) {
            console.error('Error al crear la sesión de pago: ', error)
            notification.error({
                message: 'No se pudo iniciar el pago. Inténtalo de nuevo.',
            })
            setIsLoading(false)
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
