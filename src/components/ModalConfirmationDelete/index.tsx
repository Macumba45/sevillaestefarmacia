import React, { FC } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface Props {
    open: boolean
    onClose: () => void
    onDelete: () => void
}

const DeleteConfirmationModal: FC<Props> = ({ open, onClose, onDelete }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Confirmar Eliminación
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    ¿Estás seguro de que deseas eliminar este elemento?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onDelete} color="error" autoFocus>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DeleteConfirmationModal
