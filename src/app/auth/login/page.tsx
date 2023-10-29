'use client'

import { FC, useContext, useEffect, useState } from 'react'
import { handleLoginUser } from '../../../services/auth'
import { useRouter } from 'next/navigation'
import { SpanError } from './styles'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import { UserContext } from '@/context/UserContext'

const Login: FC = () => {
    const { getUserInfo } = useContext(UserContext)

    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const email = event.currentTarget.email.value.toLowerCase()
        const password = event.currentTarget.password.value

        if (email && password) {
            try {
                setLoading(true)
                const login = await handleLoginUser(email, password)
                if (login) {
                    router.push('/')
                } else {
                    setLoading(false)
                    const errorMessage = 'Usuario o contraseña incorrectos'
                    setError(errorMessage)
                }
            } catch (error) {
                console.log('Error al realizar la solicitud:', error)
            } finally {
                getUserInfo()
            }
        }
    }

    useEffect(() => {
        const handleScroll = (event: Event) => {
            event.preventDefault()
        }

        // Bloquear el desplazamiento cuando se monta el componente
        document.body.style.overflow = 'hidden'
        document.addEventListener('scroll', handleScroll, { passive: false })

        return () => {
            // Permitir el desplazamiento cuando se desmonta el componente
            document.body.style.overflow = ''
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const dynamicTitle = 'Farmarcia Santa Bárbara - Inicio de sesión'

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = dynamicTitle
        }
    }, [])

    return (
        <>
            <CssBaseline />
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, backgroundColor: '#4675A6' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar sesión
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                        />
                        {error && <SpanError>{error}</SpanError>}

                        <Stack direction="row" mb={2} mt={2} spacing={2}>
                            <LoadingButton
                                id="login-button"
                                type="submit"
                                // startIcon={<SaveIcon />}
                                variant="contained"
                                fullWidth
                                loading={loading}
                                sx={{
                                    backgroundColor: '#4675A6',
                                    color: 'white',
                                    ':hover': {
                                        backgroundColor: '#42ACE8',
                                    },
                                }}
                            >
                                Iniciar sesión
                            </LoadingButton>
                        </Stack>
                        <Grid container>
                            <Grid item>
                                <Link
                                    href={'/auth/signup'}
                                    variant="body2"
                                    style={{ color: '#4675A6' }}
                                >
                                    ¿No tienes una cuenta? Regístrate
                                </Link>
                            </Grid>
                        </Grid>
                        {/* <Grid marginTop={2} item xs>
                            <Link
                                style={{ color: '#4675A6' }}
                                href={`/${locale}/auth/login/requestPassword`}
                                variant="body2"
                            >
                                ¿Olvidaste la contraseña?
                            </Link>
                        </Grid> */}
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Login
