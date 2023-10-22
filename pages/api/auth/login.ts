import { NextApiRequest, NextApiResponse } from 'next'
import { findUserEmail } from '../controllers/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SuccessResponse } from '../../../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SuccessResponse | { message: string }>
) {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Email and password are required' })
        }

        const user = await findUserEmail(email)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const match = await bcrypt.compareSync(
            password,
            user.password as string
        )

        if (!match) {
            return res
                .status(401)
                .json({ message: 'Email o Password inválido' })
        }

        // Autenticación exitosa
        const token = jwt.sign({ email: user.email, userId: user.id }, 'token')
        delete user.password

        const response: SuccessResponse = {
            message: 'Inicio de sesión exitoso',
            user,
            token,
        }
        return res.status(200).json(response)
    } catch (error: any) {
        console.error(error.message)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}
