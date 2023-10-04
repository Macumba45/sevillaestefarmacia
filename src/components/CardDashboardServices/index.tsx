import { FC, memo } from 'react'
import {
    EditOutlined,
    EllipsisOutlined,
    SettingOutlined,
    DeleteOutlined,
} from '@ant-design/icons'
import { Avatar, Card } from 'antd'
import { Props } from './types'

const { Meta } = Card

const styleIconButtons = {
    fontSize: '20px',
    marginRight: '10px',
}

const CardDashboardServices: FC<Props> = ({ onClick, onUpdate }) => (
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
            title="Pendientes"
            description={
                <span
                    style={{
                        color: 'green',
                        fontSize: '16px',
                        fontWeight: 600,
                    }}
                >
                    100€
                </span>
            }
        />
    </Card>
)

export default memo(CardDashboardServices)
