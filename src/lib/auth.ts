import { NextApiRequest, NextApiResponse } from 'next'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { prisma } from './client'

export const JWT_SECRET = process.env.JWT_SECRET as string

export const signToken = (payload: object) => jwt.sign(payload, JWT_SECRET)

// Devuelve el usuario del token Bearer, o null si falta o no es válido
export const getUserFromReq = async (req: NextApiRequest) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return null
    try {
        const { userId } = jwt.verify(token, JWT_SECRET) as JwtPayload
        return await prisma.user.findUnique({ where: { id: userId } })
    } catch {
        return null
    }
}

export const requireUser = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const user = await getUserFromReq(req)
    if (!user) res.status(401).json({ message: 'No autorizado' })
    return user
}

export const requireAdmin = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const user = await getUserFromReq(req)
    if (user?.role !== 'admin') {
        res.status(user ? 403 : 401).json({ message: 'No autorizado' })
        return null
    }
    return user
}
