import React, { FC, useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Importa los estilos CSS de Quill

interface Props {
    open: boolean
    onClose: () => void
}

const ServiceFormModal: FC<Props> = ({ open, onClose }) => {
    const [formData, setFormData] = useState({
        urlPicture: '',
        urlVideo: '',
        title: '',
        descripcion: '',
        price: '',
        dates: [],
    })

    const handleChange = (event: any) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleQuillChange = (html: string) => {
        setFormData({
            ...formData,
            descripcion: html,
        })
    }

    const handleSubmit = () => {
        // Realiza aquí la lógica para enviar el formulario o realizar alguna acción con los datos.
        console.log(formData)
        // Cierra el modal después de enviar el formulario.
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle> Crear Nuevo Servicio</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Por favor, complete los campos para crear un nuevo servicio.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    name="urlPicture"
                    label="URL de la Imagen"
                    type="text"
                    fullWidth
                    value={formData.urlPicture}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="urlVideo"
                    label="URL del Video"
                    type="text"
                    fullWidth
                    value={formData.urlVideo}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="title"
                    label="Título"
                    type="text"
                    fullWidth
                    value={formData.title}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Precio"
                    type="number"
                    fullWidth
                    value={formData.price}
                    onChange={handleChange}
                />
                <ReactQuill
                    theme="snow"
                    value={formData.descripcion}
                    onChange={handleQuillChange}
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
