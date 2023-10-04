'use client'

import React, { FC, memo, useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { MainContainer } from './styles'
import { Box, Button, TextField } from '@mui/material'
import logo from '../../../../assets/logo/logo.png'

const DashboardLogin: FC = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/auth/loginDashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            })
            const data = await response.json()
            return data
        } catch (error) {
            console.log(error)
        } finally {
            router.push('/dashboard')
        }
    }

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleLogin()
    }

    return (
        <MainContainer>
            <img style={{ width: '300px' }} src={logo.src} />
            <Box sx={{ mt: 1 }}>
                <TextField
                    autoComplete="off"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={handleChangeEmail}
                    sx={{
                        '& label.Mui-focused': { color: 'white' },
                        '& label.Mui': { color: 'white' },
                        '& .MuiInput-underline:after': {
                            borderColor: 'white',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    }}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }}
                    inputProps={{
                        style: { color: 'white' },
                    }}
                />
                <TextField
                    autoComplete="off"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    value={password}
                    onChange={handleChangePassword}
                    sx={{
                        '& label.Mui-focused': { color: 'white' },
                        '& .MuiInput-underline:after': {
                            borderColor: 'white',
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                        },
                    }}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }}
                    inputProps={{
                        style: { color: 'white' },
                    }}
                />
            </Box>
            <Button
                sx={{
                    mt: 2,
                    background: 'white',
                    color: 'black',
                    ':hover': {
                        backgroundColor: 'black',
                        color: 'white',
                    },
                }}
                variant="contained"
                onClick={handleLogin}
                type="submit"
            >
                Iniciar sesión
            </Button>
        </MainContainer>
    )
}

export default memo(DashboardLogin)
