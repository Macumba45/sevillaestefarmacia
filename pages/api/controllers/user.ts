import { PrismaClient } from '@prisma/client'
import { User } from '../../../types/types'

const prisma = new PrismaClient()

export const findUserEmail = async (email: string): Promise<User | null> => {
    const prismaUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (!prismaUser) {
        return null
    }
    const user: User = {
        id: prismaUser.id,
        email: prismaUser.email,
        name: prismaUser.name as string,
        password: prismaUser.password,
        role: prismaUser.role,
    }
    return user
}

export const findUserById = async (id: string): Promise<User | null> => {
    const prismaUser = await prisma.user.findUnique({
        where: {
            id: id,
        },
    })

    if (!prismaUser) {
        return null
    }
    const user: User = {
        id: prismaUser.id,
        email: prismaUser.email,
        name: prismaUser.name as string,
        password: prismaUser.password,
        role: prismaUser.role,
    }
    return user
}