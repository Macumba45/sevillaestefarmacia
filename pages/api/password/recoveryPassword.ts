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
            process.env.RESET_PASSWORD_KEY as string,
            { expiresIn: '20m' }
        )

        const transporter = nodemailer.createTransport({
            // Configuración del servicio de correo electrónico (por ejemplo, Gmail)
            host: 'smtp.sevillaestefarmacia.com',
            port: 587,
            auth: {
                user: 'info@sevillaestefarmacia.com',
                pass: process.env.EMAIL_PASSWORD_FARMACIA,
            },
            secure: false,
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false,
            },
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
            from: 'info@sevillaestefarmacia.com',
            to: email,
            subject: 'Solicitud de cambio de contraseña',
            html: `
                <h2>Por favor, haz click en el enlace para cambiar la contraseña de tu cuenta en Farmacia Sta.Bárbara </h2>
                <a href="${process.env.CLIENT_URL}/auth/login/resetPassword/${token}">Haz click aquí para cambiar tu contraseña</a>
    `,
        }
        await updateResetPasswordToken(email, token)

        // Enviar el correo electrónico
        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(
                        'Error al enviar el correo electrónico:',
                        error
                    )
                    reject(error)
                } else {
                    resolve(info)
                }
            })
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
    res.status(200).json({ message: 'Email sent successfully' })
}

export default forgotPassword
