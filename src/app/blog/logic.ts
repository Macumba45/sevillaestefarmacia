import { useState } from 'react'
import { Blogs } from '../../../types/types'
import { getBlogs } from '@/services/blogs'

export const useLogicBlog = () => {
    const [blogs, setBlogs] = useState<Blogs[] | undefined>([])

    const fetchBlogs = async () => {
        const blogs = await getBlogs()
        setBlogs(blogs)
        return blogs
    }

    return {
        fetchBlogs,
        blogs,
    }
}
