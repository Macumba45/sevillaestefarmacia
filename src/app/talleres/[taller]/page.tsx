'use client'

import { FC, memo, useEffect } from 'react'

interface Props {
    params: {
        taller: string
    }
}

const Page: FC<Props> = ({ params }) => {
    useEffect(() => {
        document.title = 'Taller'
    }, [])

    return (
        <div>
            <h1>Taller</h1>
        </div>
    )
}

export default memo(Page)
