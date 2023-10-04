'use client'
import React, { FC, memo, useState } from 'react'
import { MainContainer } from './styles'
import { Box, Button, TextField } from '@mui/material'
import logo from '../../assets/logo/logo.png'

const DashboardPage: FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/auth/loginDashboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            })
            console.log(response)
            const data = await response.json()
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <MainContainer>
            <img style={{ width: '300px' }} src={logo.src} />
            <Box
                component="form"
                onSubmit={handleLogin}
                noValidate
                sx={{ mt: 1 }}
            >
                <TextField
                    autoComplete="off"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                    onChange={e => setPassword(e.target.value)}
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
            >
                Iniciar sesión
            </Button>
        </MainContainer>
    )
}

export default memo(DashboardPage)
