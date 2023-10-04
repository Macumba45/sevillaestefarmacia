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
                    backgroundColor: '#4675A6',
                    '&:hover': {
                        backgroundColor: '#42ACE8', // Cambiar color del hover
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
