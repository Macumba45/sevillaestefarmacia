'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicBlog } from './logic'
import { UserProvider } from '@/context/UserContext'
import { MainContainer, Title, Subtitle, Container } from './styles'
import CardTallerOrBlog from '@/components/CardTallerOrBlog'

const Talleres: FC = () => {
    const { fetchBlogs, blogs } = useLogicBlog()

    useEffect(() => {
        fetchBlogs()
    }, [])

    useEffect(() => {
        document.title = 'Talleres'
    }, [])

    return (
        <UserProvider>
            <MainContainer>
                <Title>Blogs</Title>
                <Subtitle>Consejos farmacéuticos</Subtitle>
                <Container>
                    {blogs?.map(blogs => (
                        <CardTallerOrBlog
                            key={blogs.id}
                            mode="blog"
                            blog={blogs}
                        />
                    ))}
                </Container>
            </MainContainer>
        </UserProvider>
    )
}

export default memo(Talleres)
