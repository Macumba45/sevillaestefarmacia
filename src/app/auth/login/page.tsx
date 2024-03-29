'use client'

import { FC, useContext, useEffect, useState } from 'react'
import { handleLoginUser } from '../../../services/auth'
import { useRouter } from 'next/navigation'
import { SpanError, stylesTypography } from './styles'
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
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const Login: FC = () => {
    const { getUserInfo } = useContext(UserContext)
    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
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

    const dynamicTitle = 'Farmarcia Sta Bárbara - Inicio de sesión'

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
                    <Avatar sx={{ m: 1, backgroundColor: 'black' }}>
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
                            sx={stylesTypography}
                            InputLabelProps={{
                                style: {
                                    color: 'black',
                                },
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            sx={stylesTypography}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                        >
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            InputLabelProps={{
                                style: {
                                    color: 'black',
                                },
                            }}
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
                                    backgroundColor: 'black',
                                    color: 'white',
                                    ':hover': {
                                        backgroundColor: '#4b4b4b',
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
                                    style={{
                                        color: 'black',
                                        textDecorationColor: '#000000',
                                    }}
                                >
                                    ¿No tienes una cuenta? Regístrate
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid marginTop={2} item xs>
                            <Link
                                style={{
                                    color: 'black',
                                    textDecorationColor: '#000000',
                                }}
                                href={'/auth/login/requestPassword'}
                                variant="body2"
                            >
                                ¿Olvidaste la contraseña?
                            </Link>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Login
