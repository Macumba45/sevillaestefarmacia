import { getBlogById } from '@/services/blogs'
import { useState } from 'react'
import { Blogs } from '../../../../types/types'

export const useLogicBlogDetail = () => {
    const [blogDetails, setBlogDetails] = useState<Blogs | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const getBlogDetailsData = async (id: string) => {
        setIsLoading(true)
        const data = await getBlogById(id)
        setBlogDetails(data)
        setIsLoading(false)
        return data
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
    return {
        getBlogDetailsData,
        blogDetails,
        contactWhatsApp,
        isLoading,
    }
}
