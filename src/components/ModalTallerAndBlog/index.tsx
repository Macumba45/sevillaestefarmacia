import React, { useState } from 'react'
import { Button, Modal, TextField, Box } from '@mui/material'
import { Talleres } from '../../../types/types'

interface CreateTallerModalProps {
    taller?: Talleres
    open?: boolean
    onClose?: () => void
    onTallerCreate?: (taller: Talleres) => void
}

const CreateTallerModal: React.FC<CreateTallerModalProps> = ({
    open,
    onClose,
    onTallerCreate,
}) => {
    const [tallerFormData, setTallerFormData] = useState<Talleres>({
        id: '',
        title: '',
        subtitle: '',
        date: '',
        descripcion: '',
        urlPicture: '',
    })

    console.log('tallerFormData', tallerFormData)

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setTallerFormData({
            ...tallerFormData,
            [name]: value,
        })
    }

    const handleCreateTaller = (tallerFormData: Talleres) => {
        // Reemplaza los saltos de línea (line breaks) con '\n' antes de enviarlos a la base de datos.
        const descripcionConSaltosDeLinea = tallerFormData.descripcion.replace(
            /\n/g,
            '\n'
        )

        // Ahora puedes enviar descripcionConSaltosDeLinea a la base de datos.
        // Asegúrate de almacenar este valor en la base de datos, no tallerFormData.descripcion.
        console.log(descripcionConSaltosDeLinea) // Solo para depuración, asegúrate de usarlo en tu función de creación.

        // Resto de tu lógica de creación...
    }

    return (
        <Modal open={true} onClose={onClose}>
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
                    type="date"
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
                <TextField
                    name="urlPicture"
                    label="URL de la imagen"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={tallerFormData.urlPicture}
                    onChange={handleInputChange}
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
                        color="primary"
                    >
                        Crear Taller
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default CreateTallerModal
