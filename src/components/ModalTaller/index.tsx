import React, { useEffect, useState } from 'react'
import { Button, Modal, TextField, Box } from '@mui/material'
import { Talleres } from '../../../types/types'
import { useLogicDashboard } from '@/app/dashboard/logic'

interface CreateTallerModalProps {
    taller?: Talleres
    open: boolean
    onClose: () => void
    isEditing: boolean
}

const CreateTallerModal: React.FC<CreateTallerModalProps> = ({
    open,
    onClose,
    isEditing,
    taller,
}) => {
    const { postNewTaller, updateTallerById } = useLogicDashboard()

    const [formData, setFormData] = useState<Talleres>({
        title: '',
        subtitle: '',
        descripcion: '',
        urlPicture: '',
    })

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleCreateTaller = async (formData: Talleres) => {
        // Reemplaza los saltos de línea (line breaks) con '\n' antes de enviarlos a la base de datos.
        const descripcionConSaltosDeLinea = formData.descripcion.replace(
            /\n/g,
            '\n'
        )
        const taller = {
            ...formData,
            descripcion: descripcionConSaltosDeLinea,
        }

        if (isEditing && taller) {
            await updateTallerById(taller)
        } else {
            await postNewTaller(taller)
        }
        onClose()
    }

    useEffect(() => {
        if (isEditing && taller) {
            setFormData(taller)
        } else {
            setFormData({
                title: '',
                subtitle: '',
                descripcion: '',
                urlPicture: '',
            })
        }
    }, [isEditing, taller])

    return (
        <Modal
            open={open}
            onClose={onClose}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 1,
                    p: 2,
                    maxHeight: '80vh', // Altura máxima para permitir el desplazamiento
                    overflowY: 'auto', // Habilite el desplazamiento vertical
                }}
            >
                <TextField
                    name="urlPicture"
                    label="URL de la imagen"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={formData.urlPicture}
                    onChange={handleInputChange}
                />
                <TextField
                    name="title"
                    label="Título"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <TextField
                    name="subtitle"
                    label="Subtítulo"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                />
                <TextField
                    name="descripcion"
                    label="Descripción"
                    aria-label="Descripción"
                    margin="dense"
                    fullWidth
                    value={formData.descripcion}
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
                        onClick={() => handleCreateTaller(formData)}
                        variant="contained"
                        color="success"
                        sx={{ marginRight: '0.5rem' }}
                    >
                        {isEditing ? 'Editar taller' : 'Crear taller'}
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
