import { useState } from 'react'
import { Blogs } from '../../../types/types'
import { getBlogs } from '@/services/blogs'

export const useLogicBlog = () => {
    const [blogs, setBlogs] = useState<Blogs[] | undefined>([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchBlogs = async () => {
        setIsLoading(true)
        const blogs = await getBlogs()
        setBlogs(blogs)
        setIsLoading(false)
        return blogs
    }

    const contactWhatsApp = () => {
        // const phoneNumber = '+34682734237'
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

        const phoneNumber = '+34682734237'
        let whatsappURL = ''
        whatsappURL = `https://wa.me/${phoneNumber}`
        // if (navigator.userAgent.includes('Instagram')) {
        //     whatsappURL = `https://wa.me/${phoneNumber}`
        // }

        window.open(whatsappURL)
    }

    return {
        fetchBlogs,
        blogs,
        isLoading,
        contactWhatsApp,
    }
}
