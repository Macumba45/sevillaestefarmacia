'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicBlog } from './logic'
import LayoutNavFooter from '@/layout/layout'
import CardTallerOrBlog from '@/components/CardTallerOrBlog'
import { MainContainer, Title, Subtitle, Container } from './styles'

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
        <LayoutNavFooter>
            <MainContainer>
                <Title>BLOG</Title>
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
        </LayoutNavFooter>
    )
}

export default memo(Talleres)
