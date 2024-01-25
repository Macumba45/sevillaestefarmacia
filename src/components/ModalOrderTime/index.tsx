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
import { CircularProgress, InputLabel } from '@mui/material'
import { Dates, Hour, Payment } from '../../../types/types'
import { fetchPaymentsData } from '@/services/payments'
import LoadingButton from '@mui/lab/LoadingButton'

interface Props {
    dates?: Dates[]
    open: boolean
    isEditing?: boolean
    isLoading: boolean
    handleClose?: () => void
    handleReservarCita: () => void
    onHourIdChange: (newHourId: string) => void
    onDateIdChange: (newDateId: string) => void
    editDateAndHour?: () => void
}

const ModalOrderTime: FC<Props> = ({
    dates,
    open,
    isEditing,
    isLoading,
    handleClose,
    handleReservarCita,
    onHourIdChange,
    onDateIdChange,
    editDateAndHour,
}) => {
    const [selectedDate, setSelectedDate] = useState<{
        date: string
        id: string
    }>({ date: '', id: '' })
    const [selectedHour, setSelectedHour] = useState<Hour>({
        hour: '',
        id: '',
    })
    const [dateIdMap, setDateIdMap] = useState<{ [date: string]: string }>({})
    const [payments, setPayments] = useState([])
    const [isLoadingPayments, setIsLoadingPayments] = useState(false)

    const now = new Date()
    now.setUTCHours(23, 59, 59, 999)
    const currentHour = now.getHours()
    const currentMinutes = now.getMinutes()

    let upcomingDates = dates?.map(date => {
        if (date.date) {
            const parts = date.date.split('/')
            const day = parseInt(parts[0], 10)
            const month = parseInt(parts[1], 10) - 1
            const year = parseInt(parts[2], 10)
            const dateObject = new Date(year, month, day)

            if (dateObject.toDateString() === now.toDateString()) {
                // Si la fecha es hoy, filtra las horas que ya han pasado
                date.hours = date.hours.filter(hour => {
                    const [hourPart, minutePart] = hour
                        .hour!.split(':')
                        .map(Number)
                    return (
                        hourPart > currentHour ||
                        (hourPart === currentHour &&
                            minutePart > currentMinutes)
                    )
                })
            }

            // Si todas las horas de hoy han pasado, filtra el día completo
            if (
                dateObject.toDateString() === now.toDateString() &&
                date.hours.length === 0
            ) {
                return null
            }

            return date
        }
        return null
    })

    upcomingDates = upcomingDates
        ?.filter(date => {
            if (date && date.date) {
                const parts = date.date.split('/')
                const day = parseInt(parts[0], 10)
                const month = parseInt(parts[1], 10) - 1
                const year = parseInt(parts[2], 10)
                const dateObject = new Date(
                    Date.UTC(year, month, day, 23, 59, 59, 999)
                )

                return dateObject >= now
            }
            return false
        })
        .sort((a, b) => {
            const [dayA, monthA, yearA] = a!.date!.split('/').map(Number) as any
            const [dayB, monthB, yearB] = b!.date!.split('/').map(Number) as any
            const dateA = new Date(yearA, monthA - 1, dayA)
            const dateB = new Date(yearB, monthB - 1, dayB)
            return dateA.getTime() - dateB.getTime()
        })

    let buttonName: string = ''
    if (
        typeof window !== 'undefined' &&
        typeof window.document !== 'undefined'
    ) {
        buttonName =
            document.location.pathname === '/dashboard'
                ? 'Actualizar cita'
                : 'Reservar cita'
    }

    const getAvailableHours = (selectedDate: string) => {
        if (!selectedDate) {
            return []
        }

        if (dates) {
            const selectedService = dates.find(
                date => date.date === selectedDate
            )
            if (selectedService) {
                return selectedService.hours.map(hour => {
                    // Verifica si hay un pago con payed: true para esta hora
                    const isBooked = payments.some(
                        (payment: Payment) =>
                            payment.hourId === hour.id && payment.payed
                    )
                    return {
                        ...hour,
                        isBooked,
                    }
                })
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
        setSelectedDate({ date: newDate, id: dateIdMap[newDate] }) // Asumiendo que dateIdMap tiene el mapeo de IDs por fecha
        onDateIdChange(dateIdMap[newDate]) // Pasar la ID en lugar de la fecha
        const loadPayments = async () => {
            setIsLoadingPayments(true)
            const paymentsData = await fetchPaymentsData()
            setPayments(paymentsData)
            setIsLoadingPayments(false)
        }
        loadPayments()
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

    const resetHour = () => {
        setSelectedHour({ hour: '', id: '' })
    }

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
                                Selecciona una Fecha
                            </InputLabel>
                            <Select
                                label="Selecciona una fecha"
                                value={selectedDate.date || ''}
                                onChange={handleDateChange}
                                onClick={resetHour}
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
                                    <MenuItem key={index} value={date!.date}>
                                        {formatDateString(date!.date)}{' '}
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
                                    // Filtra la hora correspondiente a event.target.value en la fecha seleccionada
                                    const selectedDateObject = dates!.find(
                                        date => date.date === selectedDate.date
                                    )
                                    if (selectedDateObject) {
                                        const selectedHour =
                                            selectedDateObject.hours.find(
                                                hour =>
                                                    hour.hour ===
                                                    event.target.value
                                            )
                                        if (selectedHour) {
                                            // Si se encontró una hora, establece el ID, de lo contrario, establece un valor predeterminado
                                            const newHourId = selectedHour.id
                                            setSelectedHour({
                                                hour: event.target
                                                    .value as string,
                                                id: newHourId,
                                            })

                                            // Notifica el cambio en el ID de la hora a la vista principal
                                            onHourIdChange(newHourId as string)
                                        }
                                    }
                                }}
                                disabled={
                                    selectedDate.date.length === 0 &&
                                    !selectedDate.date
                                }
                            >
                                {isLoadingPayments ? (
                                    // Indicador de carga mientras se obtienen los datos
                                    <MenuItem disabled>
                                        <CircularProgress size={20} />
                                        <span
                                            style={{
                                                fontFamily: 'Roboto',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            Cargando horas...
                                        </span>
                                    </MenuItem>
                                ) : (
                                    getAvailableHours(selectedDate.date)
                                        .sort((a, b) => {
                                            // Ordenar las horas de más temprano a más tarde
                                            return a.hour!.localeCompare(
                                                b.hour as string
                                            )
                                        })
                                        .map((hour, index) => (
                                            <MenuItem
                                                key={index}
                                                value={hour.hour}
                                                disabled={hour.isBooked}
                                            >
                                                {`${hour.hour} - ${
                                                    hour.isBooked
                                                        ? 'Reservado'
                                                        : 'Disponible'
                                                }`}
                                            </MenuItem>
                                        ))
                                )}
                            </Select>
                        </FormControl>
                    </FormControl>
                </DialogContent>
                <DialogActions
                    sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}
                >
                    <LoadingButton
                        loading={isLoading}
                        sx={{ color: 'white', backgroundColor: 'black' }}
                        variant="contained"
                        onClick={
                            isEditing ? editDateAndHour : handleReservarCita
                        }
                        disabled={
                            selectedDate.date.length === 0 ||
                            selectedHour.hour!.length === 0
                        }
                    >
                        {buttonName}
                    </LoadingButton>
                    <Button sx={{ color: 'black' }} onClick={handleClose}>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default ModalOrderTime
