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

    const [tallerFormData, setTallerFormData] = useState<Talleres>({
        title: '',
        subtitle: '',
        descripcion: '',
        urlPicture: '',
    })

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setTallerFormData({ ...tallerFormData, [name]: value })
    }

    const handleCreateTaller = async (tallerFormData: Talleres) => {
        // Reemplaza los saltos de línea (line breaks) con '\n' antes de enviarlos a la base de datos.
        const descripcionConSaltosDeLinea = tallerFormData.descripcion.replace(
            /\n/g,
            '\n'
        )
        const taller = {
            ...tallerFormData,
            descripcion: descripcionConSaltosDeLinea,
        }

        if (isEditing && taller) {
            console.log(taller)
            await updateTallerById(taller)
        } else {
            await postNewTaller(taller)
        }
        onClose()
    }
    useEffect(() => {
        if (isEditing && taller) {
            setTallerFormData(taller)
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
                        {isEditing ? 'Editar' : 'Crear'}
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
