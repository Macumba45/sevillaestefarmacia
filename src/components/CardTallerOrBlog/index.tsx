import React, { FC } from 'react'
import { Card, Button } from 'antd'
import { Blogs, Talleres } from '../../../types/types'
import HoverMotion from '../../animations/hover'
import Link from 'next/link'

const { Meta } = Card

type ModalMode = 'taller' | 'blog'

interface Props {
    mode: ModalMode // Puedes usar 'talleres' o 'blogs' como valores
    taller?: Talleres
    blog?: Blogs
}

const route = (mode: ModalMode, id: string) => {
    if (mode === 'taller') {
        return `/talleres/${id}`
    } else {
        return `/blog/${id}`
    }
}

const CardTallerOrBlog: FC<Props> = ({ mode, blog, taller }) => (
    <div
        style={{
            margin: '1.5rem',
            display: 'flex',
            justifyContent: 'center',
        }}
    >
        <Card
            hoverable
            style={{ width: 320 }}
            cover={
                <img
                    alt={mode === 'blog' ? blog?.title : taller?.title}
                    src={
                        mode === 'blog' ? blog?.urlPicture : taller?.urlPicture
                    }
                    // Asegúrate de usar el título correspondiente según el modo.
                />
            }
        >
            <Meta
                title={
                    <div
                        style={{
                            whiteSpace: 'normal', // Permite que el texto se expanda a múltiples líneas
                            overflow: 'hidden', // Oculta el contenido que no cabe
                            textOverflow: 'ellipsis', // Agrega puntos suspensivos cuando el texto se recorta
                        }}
                    >
                        {mode === 'blog' ? blog?.title : taller?.title}
                    </div>
                }
                description={
                    mode === 'blog' ? blog?.subtitle : taller?.subtitle
                }
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <HoverMotion>
                    <Link
                        href={route(
                            mode,
                            mode === 'blog'
                                ? (blog?.id as string)
                                : (taller?.id as string)
                        )}
                    >
                        <Button
                            type="primary"
                            style={{
                                marginTop: '2rem',
                                backgroundColor: 'transparent',
                                color: 'black',
                                boxShadow: 'none',
                                fontFamily: 'Cormorant Garamond',
                                border: '1px solid black',
                            }}
                        >
                            Más información
                        </Button>
                    </Link>
                </HoverMotion>
            </div>
        </Card>
    </div>
)

export default CardTallerOrBlog
