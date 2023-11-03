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
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap" />
                <title>Confirmación de Pago</title>
            </head>
            
            <body style="margin: 0px;font-family: Cormorant Garamond;">
                <div class="container"
                    style="margin: 0 auto; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); height: 100vh; background-color: black;">
                    <div class="logo"
                        style="text-align: center; background-color: black; width: 100%; height: 80px; display: flex; justify-content: center; align-items: center; object-fit: cover;">
                        <img style="object-fit: cover; width: 200px;" src="https://i.postimg.cc/Wbq8HpKC/logo.png"
                            alt="Farmacia Santa Bárbara">
                    </div>
                    <div class="message" style="text-align: center; margin-top: 20px; font-size: 25px; color: white;">
                        <p>¡Muchas gracias por tu compra!</p>
                    </div>
                    <div class="received" style="text-align: center; margin-top: 20px; font-size: 15px;color: white;">
                        <p>Gracias por elegir Farmacia Santa Bárbara para tu cita.</p>
                    </div>
                    <div class="data" style="text-align: center; margin-top: 70px; font-size: 20px;color: white;">
                        <p>Tu cita es para:</p>
                    </div>
                    <div class="icon" style="text-align: center; margin-top: 20px; display: flex; justify-content: center;">
                        <div style="display: flex; align-items: center; justify-content: center; margin-right: 1rem;">
                            <img style="width: 30px; height: 30px; margin-right: 8px;" src="/src/assets/icons8-calendar-80.png" />
                            <p style="font-size: 20px;color: white;">${date}</p>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: center; margin-left: 1rem;">
                            <img style="width: 30px; height: 30px;margin-right: 8px" src="/src/assets/icons8-time-100.png" />
                            <p style="font-size: 20px;color: white;">${hour}</p>
                        </div>
                    </div>
                    <div class="button"
                        style="text-align: center; margin-top: 20px; font-size: 15px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <p style="font-size: 1rem;color: white;">¿Tienes alguna duda?</p>
                        <button onclick=""
                            style="font-family: Cormorant Garamond; background-color: black; border: 1px solid white; color: white; border-radius: 20px; width: 200px; margin: 0.5rem; height: 40px; cursor: pointer;">
                            <a style="text-decoration: none; color: white;" href="tel:+123456789">Llámanos</a>
                        </button>
                        <button
                            style="font-family: Cormorant Garamond; background-color: black; border: 1px solid white; color: white; border-radius: 20px; width: 200px; margin: 0.5rem; height: 40px; cursor: pointer;">
                            <a style="text-decoration: none; color: white;" href="mailto:correo@dominio.com">Envíanos un correo</a>
                        </button>
                    </div>
                    <div class="footer"
                        style="text-align: center; position: absolute; bottom: 0; left: 0; right: 0; display: flex; justify-content: center; align-items: center; margin-bottom: 3rem;">
                        <img style="width: 30px; margin: 0 10px;" src="../assets/icons8-instagram-100.png" alt="Instagram">
                        <img style="width: 30px; margin: 0 10px;" src="../assets/icons8-marker-100.png" alt="Marcador">
                    </div>
                </div>
            </body>
            
            </html>
            
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
