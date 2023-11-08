import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
require('dotenv').config()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { email, titleService } = req.body

        if (!email && !titleService) {
            throw new Error('Faltan datos para enviar el email')
        }

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
            transporter.verify(function (error: any, success: any) {
                if (error) {
                    console.log(error)
                    reject(error)
                } else {
                    resolve(success)
                }
            })
        })

        const mailOptions = {
            from: 'info@sevillaestefarmacia.com',
            to: email,
            subject: 'Gracias por tu compra en Farmacia Sta.Bárbara',
            html: `
            <!doctype html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="color-scheme" content="light" />
                    <meta name="supported-color-schemes" content="light" />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap"
                    />
                    <title>Confirmación de Pago</title>
                </head>
            
                <body style="padding: 20px">
                    <div
                        class="container"
                        style="
                            margin: 0 auto;
                            border-radius: 5px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            font-family: Cormorant Garamond;
                        "
                    >
                        <div
                            class="logo"
                            style="
                                text-align: center;
                                background-color: black;
                                width: 100%;
                                height: 80px;
                                display: flex;
                                align-items: center;
                                object-fit: cover;
                                font-family: Cormorant Garamond;
                            "
                        >
                            <img
                                style="object-fit: cover; width: 200px; margin: 0 auto"
                                src="https://i.postimg.cc/Wbq8HpKC/logo.png"
                                alt="Farmacia Santa Bárbara"
                            />
                        </div>
                        <div
                            class="message"
                            style="
                                text-align: center;
                                margin-top: 20px;
                                font-size: 25px;
                                color: black;
                                font-family: Cormorant Garamond;
                            "
                        >
                            <p>¡Muchas gracias por tu compra!</p>
                        </div>
            
                        <div
                            class="data"
                            style="
                                text-align: center;
                                margin-top: 30px;
                                font-size: 20px;
                                color: black;
                                font-family: Cormorant Garamond;
                            "
                        >
                            <p>Tu compra:</p>
                        </div>
                        <div class="icon" style="text-align: center; margin-top: 20px">
                            <div
                                style="
                                    align-items: center;
                                    text-align: center;
                                    font-family: Cormorant Garamond;
                                "
                            >
                                <img
                                    style="width: 30px; height: 30px"
                                    src="https://i.postimg.cc/SRsGpytH/icons8-paid-100.png"
                                />
                                <p style="font-size: 20px; color: black; font-weight:600;">${titleService}</p>
                            </div>
                        </div>
                        <div
                            class="button"
                            style="
                                text-align: center;
                                margin-top: 20px;
                                font-size: 15px;
                                align-items: center;
                            "
                        >
                            <p
                                style="
                                    font-size: 1rem;
                                    color: black;
                                    font-family: Cormorant Garamond;
                                    margin-top: 30px;
                                    margin-bottom: 30px;
                                "
                            >
                                ¿Tienes alguna duda?
                            </p>
                            <button
                                style="
                                    font-family: Cormorant Garamond;
                                    background-color: black;
                                    border: 1px solid white;
                                    color: white;
                                    border-radius: 20px;
                                    width: 200px;
                                    margin: 0.5rem;
                                    height: 40px;
                                    cursor: pointer;
                                    font-size: 1rem;
                                "
                            >
                                <a
                                    style="
                                        text-decoration: none;
                                        color: white;
                                        font-family: Cormorant Garamond;
                                    "
                                    href="tel:682734237"
                                    >Llámanos</a
                                >
                            </button>
                            <button
                                style="
                                    font-family: Cormorant Garamond;
                                    background-color: black;
                                    border: 1px solid white;
                                    color: white;
                                    border-radius: 20px;
                                    width: 200px;
                                    margin: 0.5rem;
                                    height: 40px;
                                    cursor: pointer;
                                    font-size: 1rem;
                                "
                            >
                                <a
                                    style="
                                        text-decoration: none;
                                        color: white;
                                        font-family: Cormorant Garamond;
                                    "
                                    href="mailto:hola@sevillaestefarmacia.com"
                                    >Envíanos un correo</a
                                >
                            </button>
                        </div>
                        <div class="footer" style="text-align: center; margin-top: 3rem">
                            <a href="https://www.instagram.com/sevillaestefarmacia/?hl=es">
                                <img
                                    style="width: 30px; margin: 0 10px"
                                    src="https://i.postimg.cc/fRnsg16w/icons8-instagram-100-1.png"
                                    alt="Instagram"
                                />
                            </a>
                            <a
                                href="https://www.google.com/maps/place/Farmacia+Sta.+B%C3%A1rbara.+Sevilla+Este/@37.4041118,-5.9139216,18.68z/data=!4m6!3m5!1s0xd126f4c90bf07e7:0xfb6e4b26534ae22a!8m2!3d37.4040896!4d-5.9138217!16s%2Fg%2F11gd3bskf2?entry=ttu"
                            >
                                <img
                                    style="width: 30px; margin: 0 10px"
                                    src="https://i.postimg.cc/hGKBKTD6/icons8-marker-100-1.png"
                                    alt="Marcador"
                                />
                            </a>
                        </div>
                        <div
                            class="received"
                            style="
                                text-align: center;
                                margin-top: 20px;
                                font-size: 15px;
                                color: black;
                                font-family: Cormorant Garamond;
                                height: 50px;
                            "
                        >
                            <p>Gracias por elegir Farmacia Sta. Bárbara. &#9829;</p>
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
