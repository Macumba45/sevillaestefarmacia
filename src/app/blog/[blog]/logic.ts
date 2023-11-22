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
        let message = `Hola, me gustaría saber más sobre el taller ${blogDetails?.title}`
        const phoneNumber = '+34682734237'

        const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
            message
        )}`

        window.open(whatsappURL)
    }
    return {
        getBlogDetailsData,
        blogDetails,
        contactWhatsApp,
        isLoading,
    }
}
