import React, { FC } from 'react'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import CallIcon from '@mui/icons-material/Call'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import Tooltip from '@mui/material/Tooltip'
import { User } from '../../../types/types'

interface Props {
    user: User
}

const UserAvatar: FC<Props> = ({ user }) => {
    const handleEmailClick = () => {
        // Implementa aquí la lógica para abrir el cliente de correo electrónico.
        // Puedes usar un enlace "mailto:" con el email del usuario para abrir el cliente de correo predeterminado.
        const mailtoLink = `mailto:${user.email}`
        window.open(mailtoLink)
    }

    return (
        <div
            style={{
                display: 'flex',
                margin: '1rem',
                border: '1px solid black',
                alignItems: 'center',
                minWidth: '280px',
                justifyContent: 'center',
                backgroundColor: 'black',
                borderRadius: '10px',
                height: '80px',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
            }}
        >
            <Avatar alt={user.name} />
            <div style={{ marginLeft: '16px' }}>
                <p
                    style={{
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 900,
                        fontSize: '1.2rem',
                    }}
                >
                    {user.name}
                </p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Tooltip title={`Teléfono: ${user.phone}`}>
                        <IconButton color="primary" aria-label="Llamar">
                            <CallIcon
                                sx={{
                                    color: 'white',
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Enviar correo">
                        <IconButton
                            color="primary"
                            aria-label="Enviar correo"
                            onClick={handleEmailClick}
                        >
                            <MailOutlineIcon
                                sx={{
                                    color: 'white',
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default UserAvatar
