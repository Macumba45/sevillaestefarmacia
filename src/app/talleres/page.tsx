'use client'

import { FC, memo, useEffect } from 'react'

const Talleres: FC = () => {
    useEffect(() => {
        document.title = 'Talleres'
    }, [])

    return <div>Talleres</div>
}

export default memo(Talleres)
