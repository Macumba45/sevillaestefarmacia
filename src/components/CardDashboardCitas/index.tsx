// @ts-nocheck

import { FC, memo } from 'react'
import { Card } from 'antd'
import { Props } from './types'
import { Tooltip } from '@mui/material'
import Typography from 'antd/es/typography/Typography'

const { Meta } = Card

const CardDashboardCitas: FC<Props> = ({ payments, onEdit, disabled }) => {
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
                width: 360,
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
                <Typography key={2} onClick={disabled ? () => {} : onEdit}>
                    {disabled ? 'Cita pasada' : 'Editar cita'}
                </Typography>,
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
        </Card>
    )
}

export default memo(CardDashboardCitas)
