import { FC, memo } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Props } from './types'

const { Meta } = Card

const styleIconButtons = {
    fontSize: '20px',
    marginRight: '10px',
}

const CardDashboardServices: FC<Props> = ({
    onClick,
    onUpdate,
    urlPicture,
    title,
    price,
}) => (
    <Card
        style={{ width: 300, margin: 10 }}
        cover={
            <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
        }
        actions={[
            <DeleteOutlined
                onClick={onClick}
                style={styleIconButtons}
                key="delete"
            />,
            <EditOutlined
                onClick={onUpdate}
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
            title={title}
            description={
                <span
                    style={{
                        color: 'green',
                        fontSize: '16px',
                        fontWeight: 600,
                    }}
                >
                    {price}€
                </span>
            }
        />
    </Card>
)

export default memo(CardDashboardServices)
