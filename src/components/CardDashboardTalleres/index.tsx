import { FC, memo } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Props } from './types'

const { Meta } = Card

const styleIconButtons = {
    fontSize: '20px',
    marginRight: '10px',
}

const CardDashboardTalleres: FC<Props> = ({ talleres, onEdit, onDelete }) => {
    return (
        <Card
            hoverable
            style={{
                width: 300,
                margin: 10,
                objectFit: 'cover',
                objectPosition: 'center',
            }}
            cover={
                <img
                    alt="example"
                    src={talleres.urlPicture}
                    style={{
                        width: '100%',
                        height: 150,
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            }
            actions={[
                <DeleteOutlined
                    onClick={onDelete}
                    style={styleIconButtons}
                    key="delete"
                />,
                <EditOutlined
                    onClick={onEdit}
                    style={styleIconButtons}
                    key="edit"
                />,
            ]}
        >
            <Meta
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                title={talleres.title}
                description={
                    <span
                        style={{
                            color: 'green',
                            fontSize: '16px',
                            fontWeight: 600,
                            fontFamily: 'Roboto',
                        }}
                    >
                        Fecha: {talleres.date}
                    </span>
                }
            />
        </Card>
    )
}

export default memo(CardDashboardTalleres)
