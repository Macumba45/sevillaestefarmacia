import { prisma } from '../../../src/lib/client'
import { Payment } from '../../../types/types'
import { markHourAsBooked } from './hours'
import nodemailer from 'nodemailer'
require('dotenv').config()

export const getPaymentById = async (paymentId: string): Promise<Payment> => {
    const payment = await prisma.payments.findUnique({
        where: {
            id: paymentId,
        },
    })
    if (payment === null) {
        throw new Error('Payment not found')
    }

    return payment
}

export const getPaymentsData = async (): Promise<Payment[]> => {
    const payments = await prisma.payments.findMany({
        orderBy: {
            createdAt: 'asc',
        },
        select: {
            id: true,
            dateId: true,
            hourId: true,
            payed: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
            service: true,
            createdAt: true,
        },
    })

    // Obtener los objetos Date y Hour por separado
    const dateIds = payments.map(payment => payment.dateId)
    const hourIds = payments.map(payment => payment.hourId)

    const dates = await prisma.dates.findMany({
        where: {
            id: {
                in: dateIds as string[],
            },
        },
    })

    const hours = await prisma.hours.findMany({
        where: {
            id: {
                in: hourIds as string[],
            },
        },
    })

    // Mapear los resultados para combinarlos
    const paymentsWithDetails: Payment[] = payments.map(payment => {
        const date = dates.find(date => date.id === payment.dateId)
        const hour = hours.find(hour => hour.id === payment.hourId)

        const paymentWithDetails: any = {
            ...payment,
            date: date as any,
            hour: hour as any,
        }

        return paymentWithDetails
    })

    return paymentsWithDetails
}

export const makePaymentTrue = async (paymentId: string): Promise<void> => {
    // Obtener el pago con todas las relaciones necesarias
    const payment = await prisma.payments.findUnique({
        where: {
            id: paymentId,
        },
        include: {
            user: true,
            service: true,
        },
    })

    if (!payment) {
        throw new Error('Payment not found')
    }

    // Actualizar el pago a completado
    await prisma.payments.update({
        where: {
            id: paymentId,
        },
        data: {
            payed: true,
        },
    })

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

    // Determinar si es el servicio especial (sin fecha y hora)
    const isSpecialService = payment.serviceId === 'clo0e17d30004xy04cjklg2px'

    let mailOptions: any

    if (isSpecialService) {
        // Email para servicio sin fecha ni hora
        mailOptions = {
            from: 'info@sevillaestefarmacia.com',
            to: payment.user.email + ',' + 'info@sevillaestefarmacia.com',
            subject: `Gracias por elegirnos - ${payment.user.name}`,
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
                                src="https://sevillaestefarmacia.com/images/logo.png"
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
                            <p>Cliente: ${payment.user.name}</p>
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
                                <p style="font-size: 20px; color: black">${payment.service.title}</p>
                                <p style="font-size: 20px; color: black">
                                    ${payment.service.price}€
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
                                    src="https://sevillaestefarmacia.com/images/icons8-instagram-100.png"
                                    alt="Instagram"
                                />
                            </a>
                            <a
                                href="https://www.google.com/maps/place/Farmacia+Sta.+B%C3%A1rbara.+Sevilla+Este/@37.4041118,-5.9139216,18.68z/data=!4m6!3m5!1s0xd126f4c90bf07e7:0xfb6e4b26534ae22a!8m2!3d37.4040896!4d-5.9138217!16s%2Fg%2F11gd3bskf2?entry=ttu"
                            >
                                <img
                                    style="width: 30px; margin: 0 10px"
                                    src="https://sevillaestefarmacia.com/images/icons8-marker-100.png"
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
        // Obtener la fecha y hora
        const date = await prisma.dates.findUnique({
            where: { id: payment.dateId },
        })
        const hour = await prisma.hours.findUnique({
            where: { id: payment.hourId },
        })

        if (!date || !hour) {
            throw new Error('Date or hour not found')
        }

        mailOptions = {
            from: 'info@sevillaestefarmacia.com',
            to: payment.user.email + ',' + 'info@sevillaestefarmacia.com',
            subject: `Gracias por elegirnos - ${payment.user.name}`,
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
                                src="https://sevillaestefarmacia.com/images/logo.png"
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
                            <p>${payment.user.name}</p>
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
                            <p>${payment.service.title}</p>
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
                            <p>Total: ${payment.service.price}€</p>
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
                                <p style="font-size: 20px; color: black">${date.dates}</p>
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
                                    ${hour.hour}
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
                                    src="https://sevillaestefarmacia.com/images/icons8-instagram-100.png"
                                    alt="Instagram"
                                />
                            </a>
                            <a
                                href="https://www.google.com/maps/place/Farmacia+Sta.+B%C3%A1rbara.+Sevilla+Este/@37.4041118,-5.9139216,18.68z/data=!4m6!3m5!1s0xd126f4c90bf07e7:0xfb6e4b26534ae22a!8m2!3d37.4040896!4d-5.9138217!16s%2Fg%2F11gd3bskf2?entry=ttu"
                            >
                                <img
                                    style="width: 30px; margin: 0 10px"
                                    src="https://sevillaestefarmacia.com/images/icons8-marker-100.png"
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

    // Enviar el correo electrónico
    try {
        await new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error: any, info: any) => {
                if (error) {
                    console.error('Error al enviar el correo electrónico:', error)
                    reject(error)
                } else {
                    console.log('Email enviado exitosamente:', info)
                    resolve(info)
                }
            })
        })
    } catch (error) {
        console.error('Error al enviar el email:', error)
        // No lanzamos error para no interrumpir el proceso de pago
    }

    return
}

export const editDateAndHour = async (
    paymentId: string,
    hourId: string,
    dateId: string
): Promise<void> => {
    await prisma.payments.update({
        where: {
            id: paymentId,
        },
        data: {
            dateId: dateId,
            hourId: hourId,
        },
    })
    await markHourAsBooked(hourId)

    return
}

export const getPaymentsByUserId = async (userId: string) => {
    const payments = await prisma.payments.findMany({
        where: {
            userId: userId,
        },
        include: {
            service: {
                include: {
                    dates: {
                        include: {
                            hours: true,
                        },
                    },
                },
            },
        },
    })

    return payments
}
