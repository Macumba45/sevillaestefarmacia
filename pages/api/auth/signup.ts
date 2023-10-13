import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { createUser, findUserEmail } from '../controllers/user'
import { User } from '../../../types/types'
// import { sendEmailNewUser } from '../nodeMailer/newUser'
// import { newUserNotification } from '../nodeMailer/newUserNotification'
const bcrypt = require('bcrypt')

const handleSubmitSignUp = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { email, password, name, phone } = req.body
    const userExists = await findUserEmail(email)
    if (
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        typeof name !== 'string' ||
        typeof phone !== 'string'
    ) {
        res.status(400).json({
            message: 'Email and password must be strings in the request body',
        })
        return
    }
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
        const user = createUser(email, hashedPassword, name, phone)
        const token = jwt.sign({ userData }, 'token')
        res.status(200).json({
            message: 'User created successfully',
            user,
            token,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
    // finally {
    //     await newUserNotification(email)
    //     await sendEmailNewUser(email)
    // }
}

export default handleSubmitSignUp