'use client'

import React, { FC, memo, use, useEffect } from 'react'
import { useLogicLogin } from './logic'
import { MainContainer } from './styles'
import { Box, Button, TextField } from '@mui/material'
import logo from '../../../../assets/logo/logo.png'
import { get } from 'http'

const DashboardLogin: FC = () => {
    const {
        handleLogin,
        handleChangeEmail,
        handleChangePassword,
        email,
        password,
    } = useLogicLogin()

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
