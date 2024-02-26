import { useState } from 'react'
import { getTallerById } from '../../../services/talleres'
import { Talleres } from '../../../../types/types'

export const useLogicTallerDetail = () => {
    const [taller, setTaller] = useState<Talleres | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const getTallerDetailsData = async (id: string) => {
        setIsLoading(true)
        const data = await getTallerById(id)
        if (typeof window !== 'undefined') {
            document.title = `Taller de ${taller?.title}`
        }
        setTaller(data as Talleres)
        setIsLoading(false)
        return data
    }

    const contactWhatsApp = () => {
        const phoneNumber = '+34682734237'
        let whatsappURL = ''
        // whatsappURL = `https://wa.me/${phoneNumber}`
        if (navigator.userAgent.includes('Instagram')) {
            whatsappURL = `https://wa.me/${phoneNumber}`
        } else {
            whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}`
        }

        window.open(whatsappURL)
    }

    return {
        getTallerDetailsData,
        taller,
        contactWhatsApp,
        isLoading,
    }
}
