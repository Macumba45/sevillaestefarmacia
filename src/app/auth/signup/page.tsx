'use client'

import { FC, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { setAuthenticatedToken } from '../../../../storage/storage'
import { LoadingButton } from '@mui/lab'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    Snackbar,
    Stack,
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import MuiAlert from '@mui/material/Alert'
import { UserContext } from '@/context/UserContext'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

const SignUp: FC = () => {
    const { getUserInfo } = useContext(UserContext)
    const router = useRouter()
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [hasReadConditions, setHasReadConditions] = useState(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false)
    const [showDateInput, setShowDateInput] = useState(false)

    const handleSnackbarClose = (event?: any, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setSnackbarOpen(false)
    }

    const handleSuccessSnackbarClose = (event?: any, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setSuccessSnackbarOpen(false)
    }

    const handleCheckboxChange = (event: any) => {
        setHasReadConditions(event.target.checked)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        const form = event.currentTarget as HTMLFormElement
        const formData = new FormData(form)
        const name = formData.get('firstName') as string
        const email = (formData.get('email') as string).toLowerCase()
        const password = formData.get('password') as string
        const phone = formData.get('phone') as string
        const date = formData.get('birthday') as string

        if (email && password && name && phone) {
            try {
                setLoading(true)
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    body: JSON.stringify({ email, password, name, phone }),
                    headers: { 'Content-Type': 'application/json' },
                })
                if (response.ok) {
                    const data = await response.json()
                    setAuthenticatedToken(data.token) // Almacena el token JWT en el estado
                    setSuccessSnackbarOpen(true)
                    router.push('/')
                    // Realiza alguna acción en respuesta al éxito
                } else {
                    const errorData = await response.json()
                    setError(errorData.message)
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error)
                setLoading(false)
                // Realiza alguna acción en caso de error de red u otro error
            } finally {
                getUserInfo()
            }
        } else {
            setSnackbarOpen(true)
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

    // Define el título dinámico
    const dynamicTitle = 'Farmacia Santa Bárbara - Registro'

    // Actualiza el título cuando el componente se monta
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = dynamicTitle
        }
    }, [])

    return (
        <div

        // style={{
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     height: '80vh',
        // }}
        >
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#4675A6' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Regístrate
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="Nombre"
                                        autoFocus
                                        inputProps={{
                                            select: {
                                                '&:before': {
                                                    borderColor: 'black',
                                                },
                                                '&:after': {
                                                    borderColor: 'black',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                {/* <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="lastName"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Apellidos"
                                        autoFocus
                                        inputProps={{
                                            select: {
                                                '&:before': {
                                                    borderColor: 'black',
                                                },
                                                '&:after': {
                                                    borderColor: 'black',
                                                },
                                            },
                                        }}
                                    />
                                </Grid> */}
                                {/* <Grid item xs={12} sm={12}>
                                    <FormControl fullWidth>
                                        {showDateInput ? (
                                            <TextField
                                                type="date"
                                                name="birthday"
                                                fullWidth
                                            />
                                        ) : (
                                            <>
                                                <InputLabel htmlFor="birthday">
                                                    Fecha de nacimiento
                                                </InputLabel>
                                                <TextField
                                                    onClick={() =>
                                                        setShowDateInput(true)
                                                    }
                                                />
                                            </>
                                        )}
                                    </FormControl>
                                </Grid> */}
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        autoComplete="phone"
                                        type="number"
                                        name="phone"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Teléfono"
                                        autoFocus
                                        inputProps={{
                                            select: {
                                                '&:before': {
                                                    borderColor: 'black',
                                                },
                                                '&:after': {
                                                    borderColor: 'black',
                                                },
                                            },
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Contraseña"
                                        type="password"
                                        id="password"
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={hasReadConditions}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label={
                                        <Typography style={{ fontSize: 14 }}>
                                            {t('lopd')}.{' '}
                                            <a
                                                target="blank"
                                                href="https://ivory-georgia-49.tiiny.site/"
                                            >
                                                {t('readPdf')}
                                            </a>
                                        </Typography>
                                    }
                                />
                            </Grid> */}
                            </Grid>
                            {error && (
                                <Typography
                                    variant="body2"
                                    color="error"
                                    align="center"
                                    sx={{ mt: 2 }}
                                >
                                    {error}
                                </Typography>
                            )}
                            <Stack direction="row" mb={2} mt={2} spacing={2}>
                                <LoadingButton
                                    id="signup-button"
                                    type="submit"
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
                                    Crear cuenta
                                </LoadingButton>
                            </Stack>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link
                                        href={'/auth/login'}
                                        variant="body2"
                                        style={{ color: '#4675A6' }}
                                    >
                                        ¿Ya tienes una cuenta? Inicia sesión
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={4000}
                        onClose={handleSnackbarClose}
                    >
                        <MuiAlert
                            onClose={handleSnackbarClose}
                            severity="error"
                            sx={{ width: '100%' }}
                        >
                            Por favor, completa todos los campos para
                            registrarte
                        </MuiAlert>
                    </Snackbar>

                    <Snackbar
                        open={successSnackbarOpen}
                        autoHideDuration={4000}
                        onClose={handleSuccessSnackbarClose}
                    >
                        <MuiAlert
                            onClose={handleSuccessSnackbarClose}
                            severity="success"
                            sx={{ width: '100%' }}
                        >
                            ¡Te has registrado!
                        </MuiAlert>
                    </Snackbar>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default SignUp
