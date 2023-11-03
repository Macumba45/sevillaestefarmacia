import { FC } from 'react'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface Props {
    onClick?: () => void
    disabled?: boolean
}

const FloatAddServices: FC<Props> = ({ onClick, disabled }) => {
    return (
        <>
            <Fab
                className="addService"
                onClick={onClick}
                sx={{
                    position: 'fixed',
                    bottom: '3rem',
                    right: 0,
                    marginRight: '2rem',
                    backgroundColor: '#000000',
                    '&:hover': {
                        backgroundColor: '#ffffff', // Cambiar color del hover
                        color: 'black',
                        transform: 'scale(1.1)',
                        transition: 'transform 0.4s',
                    },
                }}
                disabled={disabled}
                color="primary"
                aria-label="add"
            >
                <AddIcon />
            </Fab>
        </>
    )
}

export default FloatAddServices
