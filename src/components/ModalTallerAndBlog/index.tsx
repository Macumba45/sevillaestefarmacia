import React, { useState } from 'react'
import { Button, Modal, TextField, Box } from '@mui/material'
import { Talleres } from '../../../types/types'
import { useLogicDashboard } from '@/app/dashboard/logic'

interface CreateTallerModalProps {
    taller?: Talleres
    open: boolean
    onClose: () => void
}

const CreateTallerModal: React.FC<CreateTallerModalProps> = ({
    open,
    onClose,
}) => {
    const { postNewTaller, updateTallerById } = useLogicDashboard()

    const [tallerFormData, setTallerFormData] = useState<Talleres>({
        title: '',
        subtitle: '',
        date: '', // Establece la fecha actual en formato "dd/mm/yyyy"
        descripcion: '',
        urlPicture: '',
    })

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setTallerFormData({ ...tallerFormData, [name]: value })
    }

    const handleCreateTaller = (tallerFormData: Talleres) => {
        // Reemplaza los saltos de línea (line breaks) con '\n' antes de enviarlos a la base de datos.
        const descripcionConSaltosDeLinea = tallerFormData.descripcion.replace(
            /\n/g,
            '\n'
        )
        const taller = {
            ...tallerFormData,
            descripcion: descripcionConSaltosDeLinea,
        }
        postNewTaller(taller)
        onClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 1,
                    p: 2,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <TextField
                    name="urlPicture"
                    label="URL de la imagen"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={tallerFormData.urlPicture}
                    onChange={handleInputChange}
                />
                <TextField
                    name="title"
                    label="Título"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={tallerFormData.title}
                    onChange={handleInputChange}
                />
                <TextField
                    name="subtitle"
                    label="Subtítulo"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={tallerFormData.subtitle}
                    onChange={handleInputChange}
                />
                <TextField
                    name="date"
                    type="text"
                    label="Fecha"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={tallerFormData.date}
                    onChange={handleInputChange}
                />
                <TextField
                    name="descripcion"
                    label="Descripción"
                    aria-label="Descripción"
                    margin="dense"
                    fullWidth
                    value={tallerFormData.descripcion}
                    onChange={handleInputChange}
                    minRows={5}
                    multiline
                />

                <div
                    style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        onClick={() => handleCreateTaller(tallerFormData)}
                        variant="contained"
                        color="success"
                        sx={{ marginRight: '0.5rem' }}
                    >
                        Crear Taller
                    </Button>
                    <Button
                        onClick={() => onClose()}
                        variant="contained"
                        color="error"
                        sx={{ marginLeft: '0.5rem' }}
                    >
                        Cancelar
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default CreateTallerModal
