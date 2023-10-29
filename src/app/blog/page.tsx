'use client'

import { FC, memo, useEffect } from 'react'
import { useLogicBlog } from './logic'
import LayoutNavFooter from '@/layout/layout'
import CardTallerOrBlog from '@/components/CardTallerOrBlog'
import { MainContainer, Title, Subtitle, Container } from './styles'
import CircularIndeterminate from '@/components/Loader'
import AnimatedView from '@/animations/AnimatedContainer'

const Blog: FC = () => {
    const { fetchBlogs, blogs, isLoading } = useLogicBlog()

    useEffect(() => {
        fetchBlogs()
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = 'Blog'
        }
    }, [])

    return (
        <LayoutNavFooter>
            <MainContainer>
                <Title>BLOG</Title>
                <Subtitle>Consejos farmacéuticos</Subtitle>
                <Container>
                    {isLoading && (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '40vh',
                            }}
                        >
                            <CircularIndeterminate />
                        </div>
                    )}
                    {blogs?.map(blogs => (
                        <AnimatedView key={blogs.id}>
                            <CardTallerOrBlog
                                key={blogs.id}
                                mode="blog"
                                blog={blogs}
                            />
                        </AnimatedView>
                    ))}
                </Container>
            </MainContainer>
        </LayoutNavFooter>
    )
}

export default memo(Blog)
