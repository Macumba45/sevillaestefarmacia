'use client'

import { FC, useContext, useEffect, useState } from 'react'
import { UserContext } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { setAuthenticatedToken } from '../../../../storage/storage'
import { LoadingButton } from '@mui/lab'
import { createTheme, ThemeProvider } from '@mui/material/styles'
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
import { stylesTypography } from './styles'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    Snackbar,
    Stack,
} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

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
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }
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
    const dynamicTitle = 'Farmacia Sta Bárbara - Registro'

    // Actualiza el título cuando el componente se monta
    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.title = dynamicTitle
        }
    }, [])

    return (
        <div>
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
                        <Avatar sx={{ m: 1, bgcolor: '#000000' }}>
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
                                        label="Nombre y apellidos"
                                        autoFocus
                                        sx={stylesTypography}
                                        InputLabelProps={{
                                            style: {
                                                color: 'black',
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
                                        sx={stylesTypography}
                                        InputLabelProps={{
                                            style: {
                                                color: 'black',
                                            },
                                        }}
                                        onChange={event => {
                                            if (event.target.value.length > 9) {
                                                event.target.value =
                                                    event.target.value.slice(
                                                        0,
                                                        9
                                                    )
                                            }
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
                                        sx={stylesTypography}
                                        InputLabelProps={{
                                            style: {
                                                color: 'black',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Contraseña"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        id="password"
                                        sx={stylesTypography}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
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
                                        backgroundColor: '#000000',
                                        color: 'white',
                                        ':hover': {
                                            backgroundColor: '#4b4b4b',
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
                                        style={{
                                            color: '#000000',
                                            textDecorationColor: '#000000',
                                        }}
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
