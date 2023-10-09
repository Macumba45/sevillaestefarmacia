import { ChangeEvent, useState } from 'react'
import { setAuthenticatedToken } from '../../../../../storage/storage'
import { useRouter } from 'next/navigation'

export const useLogicLogin = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>('admin@admin.com')
    const [password, setPassword] = useState<string>('')

    const handleLogin = async () => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            })
            if (response.ok) {
                const data = await response.json()
                setAuthenticatedToken(data.token)
                // window.localStorage.setItem(
                //     'user',
                //     JSON.stringify(data.user.role)
                // )
                router.push('/dashboard')
                return data
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return {
        handleLogin,
        handleChangeEmail,
        handleChangePassword,
        email,
        password,
    }
}
