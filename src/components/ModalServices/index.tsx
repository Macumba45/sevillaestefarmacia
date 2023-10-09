'use client'

import React, { FC, useMemo, useState } from 'react'
import { useLogicDashboard } from '@/app/dashboard/logic'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css' // Importa los estilos CSS de Quill
import DateSelection from '../DaysSelect'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material'
import { DateObject } from 'react-multi-date-picker'
import DatePickerComponent from '../DaysSelect'
import { Services } from '../../../types/types'

interface Props {
    open: boolean
    onClose: () => void
}

const ServiceFormModal: FC<Props> = ({ open, onClose }) => {
    const { createService } = useLogicDashboard()
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
    const [selectedDays, setSelectedDays] = useState<DateObject[]>([])
    const dates = selectedDays.map(day => day.format('DD/MM/YYYY'))

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
            setSelectedDays(dates)
        } else {
            setSelectedDays([dates as DateObject])
        }
    }

    const handleSubmit = async () => {
        // Realiza aquí la lógica para enviar el formulario o realizar alguna acción con los datos.

        const serviceData: Services = {
            urlPicture,
            urlVideo,
            title,
            price,
            descripcion,
            dates,
        }

        // Llama a createService con la estructura correcta
        await createService(serviceData)
        // Cierra el modal después de enviar el formulario.
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle> Crear Nuevo Servicio</DialogTitle>
            <DialogContent>
                <DialogContentText marginBottom={2}>
                    Por favor, complete los campos para crear un nuevo servicio.
                </DialogContentText>
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
                <DatePickerComponent onDateSelectionChange={handleDayChange} />
                <ReactQuill
                    theme="snow"
                    value={descripcion}
                    onChange={handleDescripcionChange}
                    placeholder="Descripción"
                    style={{ height: '300px', marginTop: '0.6rem' }}
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
            </DialogContent>
            <DialogActions
                sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 2 }}
            >
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                >
                    Crear Servicio
                </Button>
                <Button onClick={onClose} color="error">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ServiceFormModal
