'use client'
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { FC, useState } from 'react'
import { InputLabel } from '@mui/material'

interface Props {
    dates?: {
        dates: string
        hours: string[]
    }[]
    open: boolean
    handleClose?: () => void
    handlClickOpen?: () => void
}

const OrderServicesDate: FC<Props> = ({
    dates,
    open,
    handlClickOpen,
    handleClose,
}) => {
    const [selectedDate, setSelectedDate] = useState<string>('')
    const [selectedHour, setSelectedHour] = useState<string>('')
    console.log(selectedDate, selectedHour)

    const getAvailableHours = (selectedDate: string) => {
        if (dates) {
            const selectedService = dates.find(
                date => date.dates === selectedDate
            )
            if (selectedService) {
                return selectedService.hours
            }
        }
        return []
    }

    const handleDateChange = (event: SelectChangeEvent) => {
        const newDate = event.target.value as string
        setSelectedDate(newDate)
        setSelectedHour('') // Reiniciar la hora seleccionada

        // Puedes hacer lo que quieras con las horas aquí, como establecer una variable de estado para ellas.
        const hours = getAvailableHours(newDate)
        // Ahora tienes las horas disponibles en el arreglo 'hours'.
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
                            flexDirection: 'row',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100px',
                        }}
                    >
                        <FormControl sx={{ mr: 2, width: 300 }}>
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
                                value={selectedDate}
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
                                {dates?.map((date, index) => (
                                    <MenuItem key={index} value={date.dates}>
                                        {date.dates}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ ml: 2, width: 300 }}>
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
                                value={selectedHour}
                                onChange={(event: SelectChangeEvent) =>
                                    setSelectedHour(
                                        event.target.value as string
                                    )
                                }
                                inputProps={{
                                    name: 'hours',
                                    id: 'hours',
                                }}
                                disabled={!selectedDate}
                            >
                                <MenuItem value={''}>
                                    Selecciona una hora
                                </MenuItem>
                                {getAvailableHours(selectedDate).map(
                                    (hour, index) => (
                                        <MenuItem key={index} value={hour}>
                                            {hour}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                        </FormControl>
                    </FormControl>
                </DialogContent>
                <DialogActions
                    sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}
                >
                    <Button
                        sx={{ color: 'white', backgroundColor: 'black' }}
                        variant="contained"
                        onClick={handleClose}
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

export default OrderServicesDate
