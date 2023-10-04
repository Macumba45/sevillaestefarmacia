import { NextApiRequest, NextApiResponse } from 'next'
import { findDashboardUser } from '../controllers/authDashboard'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email, password } = req.body

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

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            user,
        })
    } catch (error) {
        console.log(error)
    }

    res.status(200).json({ message: 'User found' })
}
