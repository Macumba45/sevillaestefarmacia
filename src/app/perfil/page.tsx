'use client'

import { UserProvider } from '../../context/UserContext'
import { FC, memo, useEffect } from 'react'

const Perfil: FC = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = 'Mi perfil';
        }
    }, []);

    return (
        <UserProvider>
            <h1>Mi perfil</h1>
        </UserProvider>
    )
}

export default memo(Perfil)
