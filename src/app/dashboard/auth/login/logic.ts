import { ChangeEvent, useState } from 'react'
import { handleLoginUser } from '../../../../services/auth'
import { useRouter } from 'next/navigation'

export const useLogicLogin = () => {
    const router = useRouter()
    const [email, setEmail] = useState<string>('admin@admin.com')
    const [password, setPassword] = useState<string>('')

    const handleLogin = async () => {
        await handleLoginUser(email, password)
        router.push('/dashboard')
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
