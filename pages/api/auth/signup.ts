import { NextApiRequest, NextApiResponse } from 'next'
import { createUser, findUserEmail } from '../controllers/user'
import { User } from '../../../types/types'
import jwt from 'jsonwebtoken'
import { sendEmailNewUser } from '../nodemailer/newUser'

// import { sendEmailNewUser } from '../nodeMailer/newUser'
// import { newUserNotification } from '../nodeMailer/newUserNotification'
const bcrypt = require('bcrypt')

const handleSubmitSignUp = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { email, password, name, phone } = req.body
    const userExists = await findUserEmail(email)

    if (userExists) {
        res.status(400).json({ message: 'User already exists' })
        return
    }

    const userData: User = {
        email: email,
        password: password,
        name: name,
        phone: phone,
    }

    try {
        // Genera un salt para el cifrado
        const salt = await bcrypt.genSalt(10)
        // Cifra la contraseña
        const hashedPassword = await bcrypt.hash(password, salt)
        // Reemplaza la contraseña en el objeto userData
        userData.password = hashedPassword
        // Guarda el usuario en la base de datos con la contraseña cifrada
        const user = await createUser(email, hashedPassword, name, phone)
        const userId = user?.id // Obtén el ID del usuario recién creado
        const token = jwt.sign({ userId }, 'token') // Incluye el ID del usuario en el token
        await sendEmailNewUser(email, name)
        console.log('Email sent')
        res.status(200).json({
            message: 'User created successfully',
            user,
            token,
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export default handleSubmitSignUp
