import { NextApiRequest, NextApiResponse } from 'next'
import { updateResetPasswordToken } from '../controllers/user'
import { findEmailToRecover } from '../controllers/password'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

async function forgotPassword(req: NextApiRequest, res: NextApiResponse) {
    try {
        const email = req.body.email
        const user = await findEmailToRecover(email)
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        const token = jwt.sign(
            { id: user.id },
            'test' as string,
            { expiresIn: '20m' }
        )

        const transporter = nodemailer.createTransport({
            // Configuración del servicio de correo electrónico (por ejemplo, Gmail)
            service: 'Gmail',
            auth: {
                user: 'gonzalolovo@gmail.com',
                pass: process.env.EMAIL_PASSWORD,
            },
            secure: true,
        })

        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error)
                    reject(error)
                } else {
                    console.log('Server is ready to take our messages')
                    resolve(success)
                }
            })
        })

        const mailOptions = {
            from: 'gonzalolovo@gmail.com',
            to: email,
            subject: 'Solicitud de cambio de contraseña',
            html: `
            <h2>Porfavor, haz click en el enlace para cambiar la contraseña de tu cuenta en Farmacia Sta.Bárbara </h2>
            <p>https://sevillaestefarmacia.vercel.app/auth/login/resetPassword/${token}</p>
            `,
        }

        await updateResetPasswordToken(email, token)

        transporter.sendMail(mailOptions, (err: any, data: any) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: 'Internal Server Error' })
            } else {
                return res
                    .status(200)
                    .json({ message: 'Email sent successfully' })
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
    res.status(200).json({ message: 'Email sent successfully' })
}

export default forgotPassword
