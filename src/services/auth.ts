import { setAuthenticatedToken } from '../../storage/storage'

export const handleLoginUser = async (email: string, password: string) => {
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
            return data
        }
    } catch (error) {
        console.log(error)
    }
}
