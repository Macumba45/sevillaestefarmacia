'use client'

import { FC, memo, useEffect } from 'react'
import LayoutNavFooter from '@/layout/layout'

const Perfil: FC = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = 'Mi perfil'
        }
    }, [])

    return (
        <LayoutNavFooter>
            <h1>Mi perfil</h1>
        </LayoutNavFooter>
    )
}

export default memo(Perfil)
