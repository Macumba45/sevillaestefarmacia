'use client'

import { FC, memo, useEffect } from 'react'
import { MainContainer } from './styles'
import { UserProvider } from '@/context/UserContext'

const Blogs: FC = () => {
    useEffect(() => {
        document.title = 'Blogs'
    }, [])

    return (
        <UserProvider>
            <MainContainer>
                <h1>Blogs</h1>
            </MainContainer>
        </UserProvider>
    )
}

export default memo(Blogs)
