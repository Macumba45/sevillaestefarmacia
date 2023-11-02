import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { email, date, hour } = req.body
        if (!email && !date && !hour) {
            throw new Error('Faltan datos para enviar el email')
        }

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
            transporter.verify(function (error: any, success: any) {
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
            to: 'gonzalolovo@gmail.com',
            subject: 'Gracias por tu compra en Farmacia Sta.Bárbara',
            html: `
                <h2>Aquí tienes la infromacion de tu cita en Farmacia Sta.Bárbara </h2>
                <p>Fecha: ${date}</p>
                <p>Hora: ${hour}</p>
                `,
        }

        // Enviar el correo electrónico
        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error: any, info: any) => {
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
