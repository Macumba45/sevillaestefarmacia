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
        let message = `Hola, me gustaría saber más sobre el taller ${taller?.title}`
        const phoneNumber = '+34682296561'

        const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
            message
        )}`

        window.open(whatsappURL)
    }
    return {
        getTallerDetailsData,
        taller,
        contactWhatsApp,
        isLoading,
    }
}
