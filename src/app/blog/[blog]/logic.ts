import { getBlogById } from '@/services/blogs'

export const useLogicBlogDetail = () => {
    const getBlogDetailsData = async (id: string) => {
        const data = await getBlogById(id)
        return data
    }
    return {
        getBlogDetailsData,
    }
}
