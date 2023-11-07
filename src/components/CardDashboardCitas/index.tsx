// @ts-nocheck

import { FC, memo } from 'react'
import { Card, Divider } from 'antd'
import { Props } from './types'
import { EditOutlined, PhoneOutlined } from '@mui/icons-material'
import { Tooltip } from '@mui/material'

const { Meta } = Card

const styleIconButtons = {
    fontSize: '20px',
    marginRight: '10px',
}

const CardDashboardCitas: FC<Props> = ({ payments, onEdit, onDelete }) => {
    function formatDateString(inputDate: any) {
        // Parsea la fecha en formato "dd/mm/yyyy" a un objeto Date
        const parts = inputDate.split('/')
        const day = parseInt(parts[0], 10)
        const month = parseInt(parts[1], 10) - 1 // Resta 1 al mes porque los meses en JavaScript son 0-indexados
        const year = parseInt(parts[2], 10)
        const dateObject = new Date(year, month, day)

        // Define los nombres de los días de la semana y de los meses
        const daysOfWeek = [
            'Domingo',
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
        ]
        const months = [
            'enero',
            'febrero',
            'marzo',
            'abril',
            'mayo',
            'junio',
            'julio',
            'agosto',
            'septiembre',
            'octubre',
            'noviembre',
            'diciembre',
        ]

        // Obtiene el día de la semana, el día del mes y el mes en formato deseado
        const dayOfWeek = daysOfWeek[dateObject.getDay()]
        const dayOfMonth = dateObject.getDate()
        const monthName = months[dateObject.getMonth()]

        // Combina los valores en el formato deseado
        const formattedDate = `${dayOfWeek}, ${dayOfMonth} de ${monthName}`

        return formattedDate
    }
    return (
        <Card
            hoverable
            style={{
                width: 350,
                margin: 10,
                objectFit: 'cover',
                objectPosition: 'center',
            }}
        >
            <Meta
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
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
                    >
                        {formatDateString(payments?.date?.dates as any)} a las{' '}
                        {payments?.hour?.hour as any}
                    </span>
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
            <Divider />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}
            >
                <div>
                    <Tooltip
                        title={
                            'Telefono del cliente:' +
                            ' ' +
                            payments?.user?.phone
                        }
                    >
                        <PhoneOutlined
                            // onClick={onDelete}
                            style={styleIconButtons}
                            key="delete"
                            sx={{
                                ':hover': {
                                    color: 'green',
                                    transform: 'scale(1.2)',
                                    transition: 'all 0.2s ease-in-out',
                                },
                            }}
                        />
                    </Tooltip>
                </div>
                <div>
                    <Tooltip title={'Editar cita del cliente'}>
                        <EditOutlined
                            onClick={onEdit}
                            style={styleIconButtons}
                            key="edit"
                            sx={{
                                ':hover': {
                                    color: 'green',
                                    transform: 'scale(1.2)',
                                    transition: 'all 0.2s ease-in-out',
                                },
                            }}
                        />
                    </Tooltip>
                </div>
            </div>
        </Card>
    )
}

export default memo(CardDashboardCitas)
