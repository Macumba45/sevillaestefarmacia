import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { prisma } from '../../../src/lib/client'
require('dotenv').config()

/**
 * Este endpoint está diseñado para probar el envío de emails de confirmación
 * sin necesidad de realizar un pago real.
 * 
 * Puedes usarlo de dos maneras:
 * 1. Pasando un paymentId existente: GET /api/nodemailer/testEmailConfirmation?paymentId=xxx
 * 2. Pasando datos de prueba en el body: POST con { email, userName, serviceTitle, servicePrice, date?, hour? }
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        let emailData: any = {}

        if (req.method === 'GET' && req.query.paymentId) {
            // Obtener datos de un pago existente
            const paymentId = req.query.paymentId as string

            const payment = await prisma.payments.findUnique({
                where: { id: paymentId },
                include: {
                    user: true,
                    service: true,
                },
            })

            if (!payment) {
                return res.status(404).json({ message: 'Payment not found' })
            }

            emailData.email = payment.user.email
            emailData.userName = payment.user.name
            emailData.serviceTitle = payment.service.title
            emailData.servicePrice = payment.service.price
            emailData.isSpecialService = payment.serviceId === 'clo0e17d30004xy04cjklg2px'

            if (!emailData.isSpecialService) {
                const date = await prisma.dates.findUnique({
                    where: { id: payment.dateId },
                })
                const hour = await prisma.hours.findUnique({
                    where: { id: payment.hourId },
                })

                emailData.date = date?.dates
                emailData.hour = hour?.hour
            }
        } else if (req.method === 'POST') {
            // Usar datos de prueba del body
            const { email, userName, serviceTitle, servicePrice, date, hour } = req.body

            if (!email || !userName || !serviceTitle || !servicePrice) {
                return res.status(400).json({
                    message: 'Faltan datos requeridos: email, userName, serviceTitle, servicePrice'
                })
            }

            emailData = {
                email,
                userName,
                serviceTitle,
                servicePrice,
                date: date || null,
                hour: hour || null,
                isSpecialService: !date && !hour,
            }
        } else {
            return res.status(405).json({ message: 'Método no permitido. Usa GET con paymentId o POST con datos' })
        }

        // Configurar el transportador de nodemailer
        const transporter = nodemailer.createTransport({
            host: 'smtp.sevillaestefarmacia.com',
            port: 587,
            auth: {
                user: 'info@sevillaestefarmacia.com',
                pass: process.env.EMAIL_PASSWORD_FARMACIA,
            },
            secure: false,
            tls: {
                rejectUnauthorized: false,
            },
        })

        // Verificar la conexión
        await new Promise((resolve, reject) => {
            transporter.verify(function (error: any, success: any) {
                if (error) {
                    console.log('Error al verificar el transporter:', error)
                    reject(error)
                } else {
                    resolve(success)
                }
            })
        })

        let mailOptions: any

        if (emailData.isSpecialService) {
            // Email para servicio sin fecha ni hora
            mailOptions = {
                from: 'info@sevillaestefarmacia.com',
                to: emailData.email,
                subject: `[PRUEBA] Gracias por elegirnos - ${emailData.userName}`,
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
                
                    <body style="margin: 0px; padding: 10px">
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
                                    src="https://www.sevillaestefarmacia.com/images/logo.png"
                                    alt="Farmacia Santa Bárbara"
                                />
                            </div>
                            <div
                                class="message"
                                style="
                                    text-align: center;
                                    font-size: 20px;
                                    color: black;
                                    font-family: Cormorant Garamond;
                                    margin: 10px;
                                "
                            >
                                <p>¡Gracias por elegirnos!</p>
                                <p>
                                    Esperamos que tu experiencia con nosotros sea
                                    extraordinaria.
                                </p>
                            </div>
                
                            <div
                                class="data"
                                style="
                                    text-align: center;
                                    margin-top: 30px;
                                    font-size: 20px;
                                    font-weight: bold;
                                    color: black;
                                    font-family: Cormorant Garamond;
                                "
                            >
                                <p>Cliente: ${emailData.userName}</p>
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
                                        font-weight: bold;
                                    "
                                >
                                    <img
                                        style="width: 30px; height: 30px"
                                        src="https://www.sevillaestefarmacia.com/images/darkIcon.png"
                                    />
                                    <p style="font-size: 20px; color: black">${emailData.serviceTitle}</p>
                                    <p style="font-size: 20px; color: black">
                                        ${emailData.servicePrice}€
                                    </p>
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
                                <a
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
                                        text-decoration: none;
                                        text-align: center;
                                        padding: 10px 20px;
                                    "
                                    href="tel:682734237"
                                    href="callto:682734237"
                                    >Llámanos</a
                                >
                                <a
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
                                        text-decoration: none;
                                        text-align: center;
                                        padding: 10px 20px;
                                    "
                                    href="mailto:hola@sevillaestefarmacia.com"
                                    >Envíanos un correo</a
                                >
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
        } else {
            // Email para servicio con fecha y hora
            mailOptions = {
                from: 'info@sevillaestefarmacia.com',
                to: emailData.email,
                subject: `[PRUEBA] Gracias por elegirnos - ${emailData.userName}`,
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
                
                    <body style="margin: 0px; padding: 10px">
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
                                    src="https://www.sevillaestefarmacia.com/images/logo.png"
                                    alt="Farmacia Santa Bárbara"
                                />
                            </div>
                            <div
                                class="message"
                                style="
                                    text-align: center;
                                    font-size: 20px;
                                    color: black;
                                    font-family: Cormorant Garamond;
                                    margin: 10px;
                                "
                            >
                                <p>¡Gracias por elegirnos!</p>
                                <p>
                                    Esperamos que tu experiencia con nosotros sea
                                    extraordinaria.
                                </p>
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
                                <p>Información de tu cita:</p>
                            </div>
                            <div
                                class="message"
                                style="
                                    text-align: center;
                                    margin-top: 20px;
                                    font-size: 20px;
                                    color: black;
                                    font-family: Cormorant Garamond;
                                    font-weight: bold;
                                "
                            >
                                <p>${emailData.userName}</p>
                            </div>
                            <div
                                class="data"
                                style="
                                    text-align: center;
                                    margin-top: 30px;
                                    font-size: 20px;
                                    color: black;
                                    font-family: Cormorant Garamond;
                                    font-weight: bold;
                                "
                            >
                                <p>${emailData.serviceTitle}</p>
                            </div>
                            <div
                                class="message"
                                style="
                                    text-align: center;
                                    margin-top: 20px;
                                    font-size: 20px;
                                    color: black;
                                    font-family: Cormorant Garamond;
                                    font-weight: bold;
                                "
                            >
                                <p>Total: ${emailData.servicePrice}€</p>
                            </div>
                            <hr
                                style="
                                    width: 20%;
                                    margin: 0 auto;
                                    background-color: black;
                                    color: black;
                                    border-color: black;
                                "
                            />
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
                                        src="https://www.sevillaestefarmacia.com/images/icons8-calendar-100.png"
                                    />
                                    <p style="font-size: 20px; color: black">${emailData.date}</p>
                                </div>
                                <div style="align-items: center; text-align: center">
                                    <img
                                        style="width: 30px; height: 30px"
                                        src="https://www.sevillaestefarmacia.com/images/icons8-time-100.png"
                                    />
                                    <p
                                        style="
                                            font-size: 20px;
                                            color: black;
                                            text-align: center;
                                            font-family: Cormorant Garamond;
                                        "
                                    >
                                        ${emailData.hour}
                                    </p>
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
                                <a
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
                                        text-decoration: none;
                                        text-align: center;
                                        padding: 10px 20px;
                                    "
                                    href="tel:682734237"
                                    href="callto:682734237"
                                    >Llámanos</a
                                >
                                <a
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
                                        text-decoration: none;
                                        text-align: center;
                                        padding: 10px 20px;
                                    "
                                    href="mailto:hola@sevillaestefarmacia.com"
                                    >Envíanos un correo</a
                                >
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
        }

        // Enviar el correo electrónico de prueba
        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                    console.error('Error al enviar el correo electrónico:', error)
                    reject(error)
                } else {
                    console.log('Email de prueba enviado exitosamente:', info)
                    resolve(info)
                }
            })
        })

        res.status(200).json({
            message: 'Email de prueba enviado exitosamente',
            emailSentTo: emailData.email,
            data: emailData
        })

    } catch (error: any) {
        console.error('Error:', error)
        res.status(500).json({
            message: 'Error al enviar el email de prueba',
            error: error.message
        })
    }
}
