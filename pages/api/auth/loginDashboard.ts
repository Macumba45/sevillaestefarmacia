import { NextApiRequest, NextApiResponse } from 'next'
import { findDashboardUser } from '../controllers/authDashboard'
import { LoginRequestBody, SuccessResponse } from '../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SuccessResponse | { message: string }>
) {
    const { email, password }: LoginRequestBody = req.body

    try {
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Email and password are required' })
        }

        const user = await findDashboardUser(email)
        console.log(user)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const response: SuccessResponse = {
            message: 'Inicio de sesión exitoso',
            user,
        }
        console.log(response)
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }

    res.status(200).json({ message: 'User found' })
}
