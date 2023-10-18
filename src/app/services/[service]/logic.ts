import { useState } from 'react'
import { getServiceDetails } from '@/services/service'
import { stripePayment } from '@/services/stripe'
import { useRouter } from 'next/navigation'
import { Services } from '../../../../types/types'

export const useLogicPageServicesDetail = () => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [serviceData, setServiceData] = useState<Services>()
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const contactWhatsApp = () => {
        const phoneNumber = '+34682296561'
        const message = `Hola Farmacia Santa Bárbara, me gustaría solicitar información sobre el servicio ${serviceData?.title}`

        const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
            message
        )}`

        window.open(whatsappURL)
    }

    const handleReservarCita = async () => {
        try {
            const priceId = serviceData?.priceId as string
            const sessionData = await stripePayment(1, priceId)
            router.push(sessionData.url)
        } catch (error) {
            console.error('Error al crear la sesión de pago: ', error)
        }
    }
    const fetchServiceDetails = async (id: string) => {
        setIsLoading(true)
        const serviceDetails = await getServiceDetails(id)
        document.title = `Farmacia Santa Bárbara - ${serviceDetails?.title}`
        setServiceData(serviceDetails)
        setIsLoading(false)
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
    }
}
