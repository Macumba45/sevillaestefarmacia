'use client'

import React, { FC, useMemo } from 'react'
import { useLogicDashboard } from '@/app/dashboard/logic'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css' // Importa los estilos CSS de Quill
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material'

interface Props {
    open: boolean
    onClose: () => void
    title: string
    description: string
    urlPicture: string
    urlVideo: string
    price: string
}

const ModalServicesEdit: FC<Props> = ({
    open,
    onClose,
    title,
    urlPicture,
    urlVideo,
    description,
    price,
}) => {
    const { serviceData } = useLogicDashboard()
    console.log(serviceData)
    const ReactQuill = useMemo(
        () => dynamic(() => import('react-quill'), { ssr: false }),
        []
    )
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
                    type="text"
                    fullWidth
                    value={urlPicture}
                    // onChange={handleUrlPictureChange}
                />
                <TextField
                    margin="dense"
                    name="urlVideo"
                    type="text"
                    fullWidth
                    value={urlVideo}
                    // onChange={handleUrlVideoChange}
                />
                <TextField
                    margin="dense"
                    name="title"
                    type="text"
                    fullWidth
                    value={title}
                    // onChange={handleTitleChange}
                />
                <TextField
                    margin="dense"
                    name="price"
                    type="number"
                    fullWidth
                    value={price}
                    // onChange={handlePriceChange}
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
                ></div>
                <ReactQuill
                    theme="snow"
                    value={serviceData?.descripcion}
                    // onChange={handleDescripcionChange}
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
                    // onClick={handleSubmit}
                >
                    Editar Servicio
                </Button>
                <Button onClick={onClose} color="error">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalServicesEdit
