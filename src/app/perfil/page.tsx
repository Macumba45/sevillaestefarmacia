'use client'

import { FC, memo, useEffect } from 'react'

const Perfil: FC = () => {
    useEffect(() => {
        document.title = 'Mi perfil'
    }, [])

    return <div>Perfil</div>
}

export default memo(Perfil)
