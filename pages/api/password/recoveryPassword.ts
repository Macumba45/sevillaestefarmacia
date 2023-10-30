import { NextApiRequest, NextApiResponse } from 'next'
import { findEmailToRecover } from '../controllers/password'
import jwt from 'jsonwebtoken'
import { updateResetPasswordToken } from '../controllers/user'
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
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset Password',
            html: `
            <h2>Please click on the given link to reset your password</h2>
            <p>${process.env.CLIENT_URL}/auth/login/resetPassword/${token}</p>
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