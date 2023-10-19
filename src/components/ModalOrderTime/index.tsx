'use client'
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FC, useEffect, useState } from 'react'
import { InputLabel } from '@mui/material'
import { Dates, Hour } from '../../../types/types'

interface Props {
    dates?: Dates[]
    open: boolean
    handleClose?: () => void
    handleReservarCita: () => void
    onHourIdChange: (newHourId: string) => void
    onDateIdChange: (newDateId: string) => void
}

const ModalOrderTime: FC<Props> = ({
    dates,
    open,
    handleClose,
    handleReservarCita,
    onHourIdChange,
    onDateIdChange,
}) => {
    const [selectedDate, setSelectedDate] = useState<{
        date: string
        id: string
    }>({ date: '', id: '' })
    const [selectedHour, setSelectedHour] = useState<Hour>()
    // Dentro del componente
    const [dateIdMap, setDateIdMap] = useState<{ [date: string]: string }>({})

    const today = new Date()

    // Filtra las fechas que son iguales o posteriores a la fecha de hoy
    const upcomingDates = dates?.filter(date => {
        const parts = date.date.split('/') // Divide la fecha en partes
        const day = parseInt(parts[0], 10)
        const month = parseInt(parts[1], 10) - 1 // Resta 1 al mes (0-indexado)
        const year = parseInt(parts[2], 10)
        const dateObject = new Date(year, month, day)

        // Compara la fecha con la fecha de hoy
        return dateObject >= today
    })

    const getAvailableHours = (selectedDate: string) => {
        if (dates) {
            const selectedService = dates.find(
                date => date.date === selectedDate
            )
            if (selectedService) {
                return selectedService.hours
            }
        }
        return []
    }

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

    const handleDateChange = (event: SelectChangeEvent) => {
        const newDate = event.target.value as string
        const newHours = getAvailableHours(newDate)
        setSelectedDate({ date: newDate, id: dateIdMap[newDate] }) // Asumiendo que dateIdMap tiene el mapeo de IDs por fecha
        setSelectedHour(newHours as any)
        onDateIdChange(dateIdMap[newDate]) // Pasar la ID en lugar de la fecha
    }

    useEffect(() => {
        if (dates) {
            const dateIdMap = dates.reduce(
                (map, date) => {
                    if (date && date.date && date.id) {
                        map[date.date] = date.id
                    } else {
                        console.error('Fecha o ID faltante en:', date)
                    }
                    return map
                },
                {} as { [date: string]: string }
            )

            setDateIdMap(dateIdMap)
        }
    }, [dates])

    return (
        <React.Fragment>
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>Selecciona fecha y hora</DialogTitle>
                <DialogContent>
                    <FormControl
                        sx={{
                            mt: 2,
                            minWidth: 120,
                            flexDirection: 'column',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '150px',
                            '@media (min-width: 600px)': {
                                flexDirection: 'row',
                                height: '80px',
                            },
                        }}
                    >
                        <FormControl sx={{ width: 280, margin: 1 }}>
                            <InputLabel
                                sx={{
                                    '&.Mui-focused': {
                                        color: 'black', // Cambia el color del label cuando enfocado
                                    },
                                }}
                                id="dates"
                            >
                                Selecciona Fecha
                            </InputLabel>
                            <Select
                                label="Selecciona Fecha"
                                value={selectedDate.date || ''}
                                onChange={handleDateChange}
                                inputProps={{
                                    name: 'dates',
                                    id: 'dates',
                                }}
                                sx={{
                                    outlineColor: 'black',
                                    '& fieldset': {
                                        borderColor: 'black', // Cambia el color del borde del fieldset
                                    },
                                    '& legend': {
                                        color: 'black', // Cambia el color del texto de la leyenda
                                        fontSize: 14,
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'black',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                        {
                                            borderColor: 'black',
                                        },
                                }}
                            >
                                <MenuItem value={''}>
                                    Selecciona una fecha
                                </MenuItem>
                                {upcomingDates?.map((date, index) => (
                                    <MenuItem key={index} value={date.date}>
                                        {' '}
                                        {/* ID de la fecha como valor */}
                                        {formatDateString(date.date)}{' '}
                                        {/* Fecha como texto del elemento */}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: 280, margin: 1 }}>
                            <InputLabel
                                sx={{
                                    '&.Mui-focused': {
                                        color: 'black', // Cambia el color del label cuando enfocado
                                    },
                                }}
                                id="hours"
                            >
                                Selecciona una Hora
                            </InputLabel>
                            <Select
                                sx={{
                                    outlineColor: 'black',
                                    '& fieldset': {
                                        borderColor: 'black', // Cambia el color del borde del fieldset
                                    },
                                    '& legend': {
                                        color: 'black', // Cambia el color del texto de la leyenda
                                        fontSize: 20,
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'black',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                        {
                                            borderColor: 'black',
                                        },
                                }}
                                label="Elija una hora"
                                value={selectedHour?.hour || ''}
                                onChange={(event: SelectChangeEvent) => {
                                    const newHourId = dates
                                        ?.map(date => date.hours)
                                        .flat()
                                        .find(
                                            hour =>
                                                hour.hour === event.target.value
                                        )?.id

                                    setSelectedHour({
                                        hour: event.target.value as string,
                                        id: newHourId,
                                    })

                                    // Notifica el cambio en hourId a la vista principal
                                    onHourIdChange(newHourId || '') // Puedes proporcionar un valor predeterminado si es necesario
                                }}
                                disabled={!selectedDate}
                            >
                                <MenuItem value={''}>
                                    Selecciona una hora
                                </MenuItem>
                                {getAvailableHours(selectedDate.date).map(
                                    (hour, index) => (
                                        <MenuItem key={index} value={hour.hour}>
                                            {`${hour.hour as any} - ${
                                                hour.isBooked
                                                    ? 'Reservado'
                                                    : 'Disponible'
                                            }`}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    </FormControl>
                </DialogContent>
                <DialogActions
                    sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
                >
                    <Button
                        sx={{ color: 'white', backgroundColor: 'black' }}
                        variant="contained"
                        onClick={handleReservarCita}
                    >
                        Reservar cita
                    </Button>
                    <Button sx={{ color: 'black' }} onClick={handleClose}>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default ModalOrderTime
