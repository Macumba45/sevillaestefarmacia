'use client'

import React, { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Container, Typography, TextField, Button, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import HoverMotion from '@/animations/hover'

interface Props {
    params: {
        token: string
    }
}

const ResetPasswordForm: FC<Props> = ({ params }) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { token } = params

    const handleSubmit = async (e: any) => {
        try {
            e.preventDefault()
            setLoading(true)
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden')
                return
            }
            const response = await fetch('/api/password/updatePassword', {
                method: 'POST',
                body: JSON.stringify({
                    password,
                    token,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                setConfirmed(true)
                setLoading(false)
            } else {
                throw new Error('Error al restablecer la contraseña')
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                mt: 3,
            }}
            component="main"
            maxWidth="xs"
        >
            <Typography component="h1" variant="h5">
                Restablece tu contraseña
            </Typography>
            <Box sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        id="password"
                        label="Nueva Contraseña"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirmar Contraseña"
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <HoverMotion>
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            disabled={!password || !confirmPassword}
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{
                                color: 'black',
                                borderColor: 'black',
                                borderRadius: '130px',
                                mt: 2,
                                backgroundColor: 'white',
                                ':hover': {
                                    backgroundColor: 'black',
                                    color: 'white',
                                    borderColor: 'transparent',
                                },
                                fontFamily: 'Cormorant Garamond',
                            }}
                        >
                            Restablecer Contraseña
                        </LoadingButton>
                    </HoverMotion>
                </form>
            </Box>
            {confirmed && (
                <>
                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 2,
                        }}
                    >
                        Contraseña restablecida correctamente
                    </Typography>
                    <Button onClick={() => router.push('/auth/login')}>
                        Iniciar sesión
                    </Button>
                </>
            )}
        </Container>
    )
}

export default ResetPasswordForm
