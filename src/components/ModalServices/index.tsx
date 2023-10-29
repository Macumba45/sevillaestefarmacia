import React, { FC, useState, useEffect } from 'react'
import { useLogicDashboard } from '@/app/dashboard/logic'
import { DateObject } from 'react-multi-date-picker'
import DatePickerComponent from '../DaysSelect'
import { Hour, Services } from '../../../types/types'
import 'react-quill/dist/quill.snow.css' // Estilo por defecto
import LoadingButton from '@mui/lab/LoadingButton'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    TextField,
    Checkbox,
    Typography,
} from '@mui/material'

interface Props {
    open: boolean
    onClose: () => void
    isEditing: boolean // Nueva prop para determinar si estamos en modo edición o creación
    serviceData?: Services // Datos del servicio para editar (solo cuando isEditing sea true)
}

const ServiceFormModal: FC<Props> = ({
    open,
    onClose,
    isEditing,
    serviceData,
}) => {
    const { createNewService, updateServiceData } = useLogicDashboard()
    const [isLoadingButton, setIsLoadingButton] = useState(false)
    const [urlPicture, setUrlPicture] = useState(
        'https://picsum.photos/200/300.jpg'
    )
    const [urlVideo, setUrlVideo] = useState(
        'https://picsum.photos/200/300.jpg'
    )
    const [descripcion, setDescripcion] = useState(
        serviceData?.descripcion || ''
    )
    const [title, setTitle] = useState('Titulo de prueba')
    const [subtitle, setSubtitle] = useState('Subtitulo de prueba')
    const [price, setPrice] = useState('100')
    const [selectedDays, setSelectedDays] = useState<
        { date: DateObject; hours: string[] }[]
    >([])
    const [selectedHours, setSelectedHours] = useState<Hour>({})
    const [hoursFromDatabase, sethoursFromDatabase] = useState<Hour[][]>([])

    const handleUrlPictureChange = (event: any) => {
        setUrlPicture(event.target.value)
    }
    const handleUrlVideoChange = (event: any) => {
        setUrlVideo(event.target.value)
    }
    const handleTitleChange = (event: any) => {
        setTitle(event.target.value)
    }

    const handleSubtitleChange = (event: any) => {
        setSubtitle(event.target.value)
    }
    const handlePriceChange = (event: any) => {
        setPrice(event.target.value)
    }

    function parseDateString(dateString: string): Date {
        const [day, month, year] = dateString.split('/')
        return new Date(Number(year), Number(month) - 1, Number(day))
    }

    const handleDayChange = (dates: DateObject[] | DateObject | null) => {
        if (Array.isArray(dates)) {
            const updatedSelectedDays = dates.map(dateObj => ({
                date: dateObj,
                hours: selectedHours.hour ? [selectedHours.hour] : [], // Usar selectedHours.hour como una cadena en un array
            }))
            setSelectedDays(updatedSelectedDays)
        } else {
            setSelectedDays([{ date: dates as DateObject, hours: [] }])
        }
    }

    const handleHourChange = (dateIndex: number, hour: Hour) => {
        const updatedSelectedDays = [...selectedDays]
        const selectedDate = selectedDays[dateIndex].date.format('DD/MM/YYYY')
        if (updatedSelectedDays[dateIndex]) {
            const { hours } = updatedSelectedDays[dateIndex]
            const hourIndex = hours.indexOf(hour as string)
            if (hourIndex === -1) {
                updatedSelectedDays[dateIndex].hours.push(hour as string)
            } else {
                updatedSelectedDays[dateIndex].hours.splice(hourIndex, 1)
            }
            setSelectedDays(updatedSelectedDays)

            // Actualiza selectedHours con los cambios
            setSelectedHours({
                ...selectedHours,
                [selectedDate]: updatedSelectedDays[dateIndex].hours.map(
                    hour => hour
                ),
            })
        }
    }

    const generateAvailableHours = () => {
        const hours: string[] = []
        for (let hour = 9; hour < 21; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                hours.push(
                    `${String(hour).padStart(2, '0')}:${String(minute).padStart(
                        2,
                        '0'
                    )}`
                )
            }
        }
        return hours
    }

    const handleSubmit = async () => {
        const serviceDataToSubmit: Services = {
            urlPicture,
            urlVideo,
            title,
            subtitle,
            price,
            descripcion,
            dates: selectedDays.map(day => ({
                date: day.date.format('DD/MM/YYYY'),
                hours: day.hours.map(hour => ({
                    hour: hour,
                    isBooked: false,
                })),
            })),
        }

        if (isEditing && serviceData) {
            // Si estamos en modo edición, llamamos a la función de actualización
            setIsLoadingButton(true)
            serviceDataToSubmit.id = serviceData.id
            await updateServiceData(serviceDataToSubmit)
            setIsLoadingButton(false)
        } else {
            // Si estamos en modo creación, llamamos a la función de creación
            setIsLoadingButton(true)
            await createNewService(serviceDataToSubmit)
            setIsLoadingButton(false)
        }

        onClose()
    }

    useEffect(() => {
        if (isEditing && serviceData) {
            setUrlPicture(serviceData.urlPicture)
            setUrlVideo(serviceData.urlVideo)
            setDescripcion(serviceData.descripcion)
            setTitle(serviceData.title)
            setPrice(serviceData.price)
            setSubtitle(serviceData.subtitle)

            // Manejar la carga de las fechas y horas aquí
            const serviceDates = isEditing ? serviceData?.dates || [] : []

            // Convierte las fechas en objetos DateObject y filtra las fechas pasadas
            const formattedDates = serviceDates
                .map(dateObj => {
                    const { date, hours } = dateObj
                    const parsedDate = parseDateString(date as string)

                    // Incluye los IDs de las horas
                    const formattedHours = hours.map(hour => ({
                        id: hour.id,
                        hour: hour.hour as string,
                        isBooked: hour.isBooked,
                    }))

                    return {
                        date: new DateObject(parsedDate),
                        hours: formattedHours, // Ahora incluye los IDs
                    }
                })
                .filter(dateObject => {
                    return dateObject.date.toDate() >= new Date()
                })

            const hours = formattedDates.map(date => date.hours)

            // Luego, establece formattedDates y hours directamente en setSelectedDays y sethoursFromDatabase
            setSelectedDays(formattedDates as any)
            sethoursFromDatabase(hours as Hour[][])
        }
    }, [isEditing, serviceData, setSelectedDays])

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                {isEditing ? 'Editar Servicio' : 'Crear Nuevo Servicio'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText marginBottom={2}>
                    Por favor, complete los campos para{' '}
                    {isEditing ? 'editar' : 'crear'} un nuevo servicio.
                </DialogContentText>
                <div>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="urlPicture"
                        label="URL de la Imagen"
                        type="text"
                        fullWidth
                        value={urlPicture}
                        onChange={handleUrlPictureChange}
                    />
                    <TextField
                        margin="dense"
                        name="urlVideo"
                        label="URL del Video"
                        type="text"
                        fullWidth
                        value={urlVideo}
                        onChange={handleUrlVideoChange}
                    />
                    <TextField
                        margin="dense"
                        name="title"
                        label="Título"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <TextField
                        margin="dense"
                        name="subtitle"
                        label="Subtítulo"
                        type="text"
                        fullWidth
                        value={subtitle}
                        onChange={handleSubtitleChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Precio"
                        type="number"
                        fullWidth
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginBottom: '2rem',
                        marginTop: '2rem',
                    }}
                >
                    <DatePickerComponent
                        onDateSelectionChange={handleDayChange}
                        initialDates={selectedDays.map(
                            selectedDay => selectedDay.date
                        )}
                    />
                    {selectedDays.length > 0 && (
                        <div>
                            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                                Fechas seleccionadas:
                            </Typography>
                            {selectedDays.map((selectedDay, index) => (
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                    key={index}
                                >
                                    <Typography
                                        sx={{
                                            mt: 2,
                                            mb: 2,
                                            fontWeight: 900,
                                            backgroundColor: 'black',
                                            color: 'white',
                                            p: 0.5,
                                            borderRadius: '5px',
                                            width: 'fit-content',
                                        }}
                                    >
                                        {selectedDay.date
                                            .toDate()
                                            .toLocaleString('es-ES', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })
                                            .replace(/^\w/, c =>
                                                c.toUpperCase()
                                            )}{' '}
                                    </Typography>
                                    <ul
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {generateAvailableHours().map(
                                            (hour, hourIndex) => (
                                                <li key={hourIndex}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={
                                                                    !isEditing
                                                                        ? selectedDay.hours.includes(
                                                                              hour
                                                                          )
                                                                        : selectedDay.hours.includes(
                                                                              hour
                                                                          ) ||
                                                                          (hoursFromDatabase[
                                                                              index
                                                                          ] &&
                                                                              hoursFromDatabase[
                                                                                  index
                                                                              ].some(
                                                                                  (
                                                                                      item: Hour
                                                                                  ) =>
                                                                                      item.hour ===
                                                                                      hour
                                                                              )) ||
                                                                          false
                                                                }
                                                                onChange={() =>
                                                                    handleHourChange(
                                                                        index,
                                                                        hour as Hour
                                                                    )
                                                                }
                                                                disabled={
                                                                    !isEditing
                                                                        ? selectedDay.hours.includes(
                                                                              hour
                                                                          )
                                                                        : hoursFromDatabase[
                                                                              index
                                                                          ] &&
                                                                          hoursFromDatabase[
                                                                              index
                                                                          ].some(
                                                                              (
                                                                                  item: Hour
                                                                              ) =>
                                                                                  item.hour ===
                                                                                      hour &&
                                                                                  item.isBooked ===
                                                                                      true
                                                                          )
                                                                }
                                                            />
                                                        }
                                                        label={hour}
                                                    />
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
            <DialogActions
                sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 2 }}
            >
                <LoadingButton
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    loading={isLoadingButton}
                >
                    {isEditing ? 'Editar Servicio' : 'Crear Servicio'}
                </LoadingButton>
                <Button onClick={onClose} color="error">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ServiceFormModal
