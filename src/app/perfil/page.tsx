'use client'

import { UserProvider } from '../../context/UserContext'
import { FC, memo, useEffect } from 'react'

const Perfil: FC = () => {
    useEffect(() => {
        window.document.title = 'Mi perfil'
    }, [window.document.title])

    return (
        <UserProvider>
            <h1>Mi perfil</h1>
        </UserProvider>
    )
}

export default memo(Perfil)
