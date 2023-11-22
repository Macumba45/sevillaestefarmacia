// @ts-nocheck

import { FC, memo } from 'react'
import { Card } from 'antd'
import { Props } from './types'
import { Button, Tooltip } from '@mui/material'
import Typography from 'antd/es/typography/Typography'

const { Meta } = Card

const CardDashboardPedidos: FC<Props> = ({ payments, onEdit, disabled }) => {
    return (
        <Card
            hoverable
            style={{
                width: '100%',
                maxWidth: '400px',
                minWidth: '300px',
                margin: 10,
                objectFit: 'cover',
                objectPosition: 'center',
            }}
            actions={[
                <Tooltip
                    key={1}
                    sx={{
                        fontSize: '30px', // Cambia el tamaño del texto dentro del Tooltip
                        '& .MuiTooltip-tooltip': {
                            maxWidth: '400px', // Cambia el tamaño del Tooltip en sí
                            fontSize: '30px', // Cambia el tamaño del texto dentro del Tooltip
                        },
                    }}
                    title={
                        <h1
                            style={{
                                fontFamily: 'Roboto',
                                fontSize: '20px',
                            }}
                        >
                            Teléfono: {payments?.user?.phone}
                        </h1>
                    }
                >
                    <Typography>Ver telefono</Typography>
                </Tooltip>,
            ]}
        >
            <Meta
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    fontFamily: 'Roboto',
                    fontWeight: 'bold',
                }}
                title={payments!.service?.title}
                description={
                    <span
                        style={{
                            color: 'black',
                            fontSize: '16px',
                            fontWeight: 600,
                            fontFamily: 'Roboto',
                        }}
                    ></span>
                }
            />
            <Meta
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                }}
                description={
                    <span
                        style={{
                            color: 'green',
                            fontSize: '16px',
                            fontWeight: 600,
                            fontFamily: 'Roboto',
                        }}
                    >
                        Cliente: {payments!.user?.name}
                    </span>
                }
            />
        </Card>
    )
}

export default memo(CardDashboardPedidos)
