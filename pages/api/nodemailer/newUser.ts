import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
require('dotenv').config()

const IMAGES: Record<string, string> = {
    logo: 'logo.png',
    instagram: 'icons8-instagram-100.png',
    marcador: 'icons8-marker-100.png',
}

const fileOf = (cid: string) =>
    path.join(process.cwd(), 'public', 'images', IMAGES[cid])

// imagen embebida en el propio correo; si el archivo no esta en el filesystem
// (p.ej. public/ no incluido en el bundle de Vercel) cae a la URL absoluta
const src = (cid: string) =>
    fs.existsSync(fileOf(cid))
        ? `cid:${cid}`
        : `https://www.sevillaestefarmacia.com/images/${IMAGES[cid]}`

const attachments = Object.keys(IMAGES)
    .filter((cid) => fs.existsSync(fileOf(cid)))
    .map((cid) => ({
        filename: IMAGES[cid],
        content: fs.readFileSync(fileOf(cid)),
        cid,
    }))

export const sendEmailNewUser = async (email: string, userName: string) => {
    // Configurar el transporte de nodemailer
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
                console.log('Server is ready to take our messages')
                resolve(success)
            }
        })
    })

    // Configurar el contenido del correo electrónico
    const mailOptions = {
        from: 'info@sevillaestefarmacia.com',
        replyTo: 'hola@sevillaestefarmacia.com',
        to: email,
        subject: `Bienvenido a Farmacia Sta. Bárbara - ${userName}`,
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
                            src="${src('logo')}"
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
                        <p>¡Bienvenido a Farmacia Sta. Bárbara - ${userName}!</p>
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
                                href="tel:682296561"
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
                    <div
                        class="footer"
                        style="
                            text-align: center;
                            margin-top: 3rem;
                        "
                    >
                        <a href="https://www.instagram.com/sevillaestefarmacia/?hl=es">
                            <img
                                style="width: 30px; margin: 0 10px"
                                src="${src('instagram')}"
                                alt="Instagram"
                            />
                        </a>
                        <a
                            href="https://www.google.com/maps/place/Farmacia+Sta.+B%C3%A1rbara.+Sevilla+Este/@37.4041118,-5.9139216,18.68z/data=!4m6!3m5!1s0xd126f4c90bf07e7:0xfb6e4b26534ae22a!8m2!3d37.4040896!4d-5.9138217!16s%2Fg%2F11gd3bskf2?entry=ttu"
                        >
                            <img
                                style="width: 30px; margin: 0 10px"
                                src="${src('marcador')}"
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
                    <p>
                        Gracias por elegir Farmacia Sta. Bárbara.
                        &#9829;
                    </p>
                </div>
                </div>
                
            </body>
        </html>
        
        
            `,
        attachments,
    }

    // Enviar el correo electrónico
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                console.error('Error al enviar el correo electrónico:', error)
                reject(error)
            } else {
                console.log('Correo electrónico enviado correctamente')
                resolve(info)
            }
        })
    })
}
