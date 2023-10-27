import { getBlogById } from '@/services/blogs'
import { useState } from 'react'
import { Blogs } from '../../../../types/types'

export const useLogicBlogDetail = () => {
    const [blogDetails, setBlogDetails] = useState<Blogs | null>(null)
    const getBlogDetailsData = async (id: string) => {
        const data = await getBlogById(id)
        if (typeof window !== 'undefined') {
            document.title = 'Blog'
        }
        setBlogDetails(data)
        return data
    }

    const contactWhatsApp = () => {
        let message = `Hola, me gustaría saber más sobre el taller ${blogDetails?.title}`
        const phoneNumber = '+34682296561'

        const whatsappURL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
            message
        )}`

        window.open(whatsappURL)
    }
    return {
        getBlogDetailsData,
        blogDetails,
        contactWhatsApp,
    }
}
