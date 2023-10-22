'use client'

import { FC, memo, useEffect } from 'react'

const Blog: FC = () => {
    useEffect(() => {
        document.title = 'Blog'
    }, [])

    return <div>Blog</div>
}

export default memo(Blog)
