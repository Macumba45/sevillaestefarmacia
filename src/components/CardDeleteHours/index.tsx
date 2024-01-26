import { FC, memo, useEffect, useState } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Card, Button } from 'antd'
import { Props } from './types'
import { Typography } from '@mui/material'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
const { Meta } = Card

const hourStyle = {
    borderRadius: '5px',
    boxShadow: '0px 0px 5px 0px rgba(197, 197, 197, 0.75)',
    padding: '10px',
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px',
    marginBottom: '30px',
}

const CardDeleteHours: FC<Props> = ({ service, onEdit, onDelete }) => {
    const [filteredDates, setFilteredDates] = useState(service.dates)
    const [bookedHours, setBookedHours] = useState<string[]>([])

    useEffect(() => {
        const now = new Date()
        now.setHours(0, 0, 0, 0)

        const updatedDates = service.dates!.filter(dateObj => {
            const [day, month, year] = dateObj.date!.split('/')
            const date = new Date(`${month}/${day}/${year}`)
            date.setHours(0, 0, 0, 0)

            return date >= now
        })

        setFilteredDates(updatedDates)
    }, [service.dates])

    // Si el servicio no tiene fechas, no renderizar el componente
    if (filteredDates!.length === 0) {
        return null
    }
    return (
        <Card
            hoverable
            style={{
                width: '100%',
                margin: 15,
                objectFit: 'cover',
                objectPosition: 'center',
            }}
            // cover={
            //     <img
            //         alt="example"
            //         src={service.urlPicture}
            //         style={{
            //             width: '100%',
            //             height: 150,
            //             objectFit: 'cover',
            //             objectPosition: 'center',
            //         }}
            //     />
            // }
        >
            <Meta
                style={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    fontFamily: 'Roboto',
                }}
                title={service.title}
                description={
                    <div>
                        {filteredDates!.map((dateObj, index) => (
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    marginBottom: '10px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                key={index}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontWeight: '900',
                                            color: '#ffffff',
                                            backgroundColor: '#000000',
                                            borderRadius: '5px',
                                            boxShadow:
                                                '0px 0px 5px 0px rgba(197, 197, 197, 0.75)',
                                            padding: '15px',
                                            width: '100%',
                                            marginBottom: '30px',
                                            marginTop: '10px',
                                        }}
                                    >
                                        Fecha: {dateObj.date}
                                    </Typography>
                                </div>
                                {dateObj.hours.map((hour, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            borderRadius: '5px',
                                            boxShadow:
                                                '0px 0px 5px 0px rgba(197, 197, 197, 0.75)',
                                            padding: '10px',
                                            margin: '10px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '150px',
                                            marginBottom: '30px',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontWeight: '900',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            {hour.hour}
                                        </span>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Button
                                                style={{
                                                    marginLeft: '10px',
                                                    backgroundColor:
                                                        hour.isBooked
                                                            ? 'transparent'
                                                            : 'red',
                                                }}
                                                disabled={hour.isBooked}
                                                type="primary"
                                                icon={<CloseOutlined />}
                                                onClick={() =>
                                                    onDelete(
                                                        service.id as string,
                                                        hour.id as string
                                                    )
                                                }
                                            />
                                            <Button
                                                style={{ marginLeft: '10px' }}
                                                disabled={
                                                    hour.isBooked ||
                                                    bookedHours.includes(
                                                        hour.id as string
                                                    )
                                                }
                                                type="primary"
                                                icon={<BookmarkAddIcon />}
                                                onClick={() => {
                                                    onEdit(hour.id as string)
                                                    setBookedHours(
                                                        prevState => [
                                                            ...prevState,
                                                            hour.id as string,
                                                        ]
                                                    )
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                }
            />
        </Card>
    )
}

export default memo(CardDeleteHours)
