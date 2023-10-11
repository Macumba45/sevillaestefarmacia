import React, { FC, useMemo, useState, useEffect } from 'react'
import { useLogicDashboard } from '@/app/dashboard/logic'
import dynamic from 'next/dynamic'
import { DateObject } from 'react-multi-date-picker'
import DatePickerComponent from '../DaysSelect'
import { Services } from '../../../types/types'
import 'react-quill/dist/quill.snow.css' // Importa los estilos CSS de Quill
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
    const { createService, updateService } = useLogicDashboard()
    const [urlPicture, setUrlPicture] = useState(
        'https://picsum.photos/200/300.jpg'
    )
    const [urlVideo, setUrlVideo] = useState(
        'https://picsum.photos/200/300.jpg'
    )
    const [descripcion, setDescripcion] = useState(
        'Esto es una prueba de descripción'
    )
    const [title, setTitle] = useState('Titulo de prueba')
    const [price, setPrice] = useState('100')
    const [selectedDays, setSelectedDays] = useState<
        { date: DateObject; hours: string[] }[]
    >([])
    const [hoursFromDatabase, sethoursFromDatabase] = useState<string[][]>([])

    function parseDateString(dateString: string): Date {
        const [day, month, year] = dateString.split('/')
        return new Date(Number(year), Number(month) - 1, Number(day))
    }

    // Cuando se inicia el modo de edición, establecer los datos existentes del servicio
    useEffect(() => {
        if (isEditing && serviceData) {
            setUrlPicture(serviceData.urlPicture)
            setUrlVideo(serviceData.urlVideo)
            setDescripcion(serviceData.descripcion)
            setTitle(serviceData.title)
            setPrice(serviceData.price)

            // Manejar la carga de las fechas y horas aquí
            const serviceDates = isEditing ? serviceData?.dates || [] : []

            // Convierte las fechas en objetos DateObject
            const formattedDates = serviceDates.map(dateObj => {
                const { date, hours } = dateObj
                const parsedDate = parseDateString(date) // Convierte la fecha al formato correcto
                return {
                    date: new DateObject(parsedDate), // Convierte la fecha a DateObject
                    hours: hours || [],
                }
            })

            const hours = formattedDates.map(date => date.hours)
            // Luego, establece formattedDates directamente en setSelectedDays
            setSelectedDays(formattedDates)
            sethoursFromDatabase(hours)
        }

        // También puedes manejar la carga de las fechas y horas aquí
    }, [isEditing, serviceData])

    const ReactQuill = useMemo(
        () => dynamic(() => import('react-quill'), { ssr: false }),
        []
    )

    const handleUrlPictureChange = (event: any) => {
        setUrlPicture(event.target.value)
    }
    const handleUrlVideoChange = (event: any) => {
        setUrlVideo(event.target.value)
    }
    const handleTitleChange = (event: any) => {
        setTitle(event.target.value)
    }
    const handlePriceChange = (event: any) => {
        setPrice(event.target.value)
    }
    const handleDescripcionChange = (html: any) => {
        setDescripcion(html)
    }

    const handleDayChange = (dates: DateObject[] | DateObject | null) => {
        if (Array.isArray(dates)) {
            const updatedSelectedDays = dates.map(date => ({
                date,
                hours: [],
            }))
            setSelectedDays(updatedSelectedDays)
        } else {
            setSelectedDays([{ date: dates as DateObject, hours: [] }])
        }
    }

    const generateAvailableHours = () => {
        const hours = []
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

    const handleHourChange = (dateIndex: number, hour: string) => {
        const updatedSelectedDays = [...selectedDays]
        if (updatedSelectedDays[dateIndex]) {
            const { hours } = updatedSelectedDays[dateIndex]
            const hourIndex = hours.indexOf(hour)
            if (hourIndex === -1) {
                updatedSelectedDays[dateIndex].hours.push(hour)
            } else {
                updatedSelectedDays[dateIndex].hours.splice(hourIndex, 1)
            }
            setSelectedDays(updatedSelectedDays)

            // Actualiza hoursFromDatabase con los cambios
            const updatedHoursFromDatabase = [...hoursFromDatabase]
            updatedHoursFromDatabase[dateIndex] =
                updatedSelectedDays[dateIndex].hours
            sethoursFromDatabase(updatedHoursFromDatabase)
        }
    }

    const handleSubmit = async () => {
        const serviceDataToSubmit: Services = {
            urlPicture,
            urlVideo,
            title,
            price,
            descripcion,
            dates: selectedDays.map(day => ({
                date: day.date.format('DD/MM/YYYY'),
                hours: day.hours,
            })),
        }
        if (isEditing && serviceData) {
            // Si estamos en modo edición, llamamos a la función de actualización
            serviceDataToSubmit.id = serviceData.id
            await updateService(serviceDataToSubmit)
        } else {
            // Si estamos en modo creación, llamamos a la función de creación
            await createService(serviceDataToSubmit)
        }

        onClose()
    }

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
                        name="price"
                        label="Precio"
                        type="number"
                        fullWidth
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>
                <ReactQuill
                    theme="snow"
                    value={descripcion}
                    onChange={handleDescripcionChange}
                    placeholder="Descripción"
                    style={{ marginTop: '0.6rem' }}
                    modules={{
                        toolbar: [
                            [{ header: '1' }, { header: '2' }, , { font: [] }],
                            [{ align: [] }],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['bold', 'italic', 'underline', 'strike'], // Agrega 'strike' para tachado
                            ,
                            ['link', 'image'],
                            ['blockquote'],
                            ['link'],
                            ['code-block'],
                            [{ color: [] }], // Agrega 'color' aquí para habilitar la opción de color de texto
                        ],
                    }}
                />
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
                                        sx={{ mt: 2, mb: 2, fontWeight: 700 }}
                                    >
                                        {selectedDay.date.format('DD/MM/YYYY')}
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
                                                                                      item: any
                                                                                  ) =>
                                                                                      item.hour ===
                                                                                      hour
                                                                              ))
                                                                }
                                                                onChange={() =>
                                                                    handleHourChange(
                                                                        index,
                                                                        hour
                                                                    )
                                                                }
                                                                disabled={
                                                                    isEditing &&
                                                                    hoursFromDatabase[
                                                                        index
                                                                    ]?.some(
                                                                        (
                                                                            item: any
                                                                        ) =>
                                                                            item.hour ===
                                                                            hour
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
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                >
                    {isEditing ? 'Editar Servicio' : 'Crear Servicio'}
                </Button>
                <Button onClick={onClose} color="error">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ServiceFormModal
