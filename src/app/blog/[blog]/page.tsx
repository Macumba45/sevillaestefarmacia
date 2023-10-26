'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicTallerDetail } from './logic'

interface Props {
    params: {
        taller: string
    }
}

const Page: FC<Props> = ({ params }) => {
    const { getTallerDetailsData } = useLogicTallerDetail()

    useEffect(() => {
        getTallerDetailsData(params.taller)
        document.title = 'Taller'
    }, [])

    return (
        <div>
            <h1>{params.taller}</h1>
        </div>
    )
}

export default memo(Page)
