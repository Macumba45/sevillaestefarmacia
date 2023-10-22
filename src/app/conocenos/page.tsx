'use client'

import { FC, memo, useEffect } from 'react'

const Conocenos: FC = () => {
    useEffect(() => {
        document.title = 'Conócenos'
    }, [])

    return <div>Conocenos</div>
}

export default memo(Conocenos)
