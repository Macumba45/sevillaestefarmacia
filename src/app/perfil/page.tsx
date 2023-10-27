'use client'

import { FC, memo, useEffect } from 'react'

const Perfil: FC = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = 'Mi perfil'
        }
    }, [])

    return (
        <>
            <h1>Mi perfil</h1>
        </>
    )
}

export default memo(Perfil)
