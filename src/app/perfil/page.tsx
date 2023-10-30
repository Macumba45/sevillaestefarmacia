'use client'

import { FC, memo, useEffect } from 'react'
import LayoutNavFooter from '@/layout/layout'
import { MainContainer } from './styles'

const Perfil: FC = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = 'Mi perfil'
        }
    }, [])

    return (
        <LayoutNavFooter>
            <MainContainer></MainContainer>
        </LayoutNavFooter>
    )
}

export default memo(Perfil)
