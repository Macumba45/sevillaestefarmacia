'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicBlog } from './logic'
import { MainContainer, Title, Subtitle, Container } from './styles'
import CardTallerOrBlog from '@/components/CardTallerOrBlog'

const Talleres: FC = () => {
    const { fetchBlogs, blogs } = useLogicBlog()

    useEffect(() => {
        fetchBlogs()
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = 'Talleres'
        }
    }, [])

    return (
        <MainContainer>
            <Title>BLOG</Title>
            <Subtitle>Consejos farmacéuticos</Subtitle>
            <Container>
                {blogs?.map(blogs => (
                    <CardTallerOrBlog key={blogs.id} mode="blog" blog={blogs} />
                ))}
            </Container>
        </MainContainer>
    )
}

export default memo(Talleres)
