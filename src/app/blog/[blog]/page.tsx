'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicBlogDetail } from './logic'

interface Props {
    params: {
        blog: string
    }
}

const Page: FC<Props> = ({ params }) => {
    const { getBlogDetailsData } = useLogicBlogDetail()

    useEffect(() => {
        getBlogDetailsData(params.blog)
        document.title = 'Taller'
    }, [document.title])

    return (
        <div>
            <h1>{params.blog}</h1>
        </div>
    )
}

export default memo(Page)
