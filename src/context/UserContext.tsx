'use client'
import { createContext, useEffect, useState } from 'react'
import { User } from '../../types/types'
import { getAuthenticatedToken } from '../../storage/storage'

// Define el valor inicial del contexto como un objeto con las propiedades correctas.
const initialContextValue = {
    user: {} as any,
    auth: false,
    getUserInfo: () => { },

}

export const UserContext = createContext(initialContextValue)

export const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState(null)
    const [auth, setAuth] = useState(Boolean);

    // Actualiza el valor del contexto con la información del usuario.

    const getUserInfo = async () => {
        try {
            const token = getAuthenticatedToken()
            const response = await fetch('/api/user/getUserInfo', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            if (response.ok) {
                const data = await response.json()
                setUser(data)
                setAuth(true)
            }
        } catch (error) {
            console.error('Error al obtener la información del usuario', error)
        }
    }
    useEffect(() => {
        if (getAuthenticatedToken()) {
            getUserInfo()
        }
    }, [])


    return (
        <UserContext.Provider value={{ user, auth, getUserInfo }}>{children}</UserContext.Provider>
    )
}
