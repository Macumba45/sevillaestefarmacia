import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../src/lib/client'
import jwt from 'jsonwebtoken'
import { User } from '../../../types/types'
import bcrypt from 'bcrypt'

async function updatePassword(req: NextApiRequest, res: NextApiResponse) {
    const { token, password } = req.body
    console.log(token, password)

    try {
        if (!token) {
            return res.status(400).json({ message: 'Token not provided' })
        }

        jwt.verify(
            token,
            process.env.RESET_PASSWORD_KEY as string,
            async function (err: any, decodedToken: any) {
                if (err) {
                    return res
                        .status(400)
                        .json({ message: 'Incorrect or Expired link' })
                }

                const user = (await prisma.user.findUnique({
                    where: {
                        id: decodedToken.id,
                        resetLink: token,
                    },
                })) as User

                if (!user) {
                    return res.status(400).json({
                        message: 'User with this token does not exist',
                    })
                }

                // Cifra la contraseña utilizando bcrypt
                const hashedPassword = await bcrypt.hash(password, 10) // 10 es el número de rondas de cifrado, puedes ajustarlo

                // Actualiza la contraseña cifrada en la base de datos
                await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        resetLink: null,
                        password: hashedPassword, // Guarda la contraseña cifrada
                    },
                })

                // Retorna una respuesta de éxito
                return res
                    .status(200)
                    .json({ message: 'Password updated successfully' })
            }
        )
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
    res.status(200).json({ message: 'Password updated successfully' })
}

export default updatePassword
