import React, { FC } from 'react'
import { Card, Button } from 'antd'
import { Blogs, Talleres } from '../../../types/types'

const { Meta } = Card

interface Props {
    blog?: Blogs
    taller?: Talleres
}

const CardTallerAndBlog: FC<Props> = ({ blog, taller }) => (
    <div
        style={{
            margin: '1rem',
            display: 'flex',
            justifyContent: 'center',
        }}
    >
        <Card
            hoverable
            style={{ width: 240 }}
            cover={
                <img
                    alt="example"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
            }
        >
            <Meta title="Europe Street beat" description="www.instagram.com" />
            <Button type="primary" style={{ marginTop: '1rem' }}>
                Más información
            </Button>
        </Card>
    </div>
)

export default CardTallerAndBlog
