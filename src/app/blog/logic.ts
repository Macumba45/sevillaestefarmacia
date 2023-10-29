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

    return {
        fetchBlogs,
        blogs,
        isLoading,
    }
}
