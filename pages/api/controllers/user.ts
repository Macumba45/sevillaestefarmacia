import { prisma } from '../../../src/lib/client'
import { User } from '../../../types/types'

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
        name: prismaUser.name,
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
        role: prismaUser.role,
        phone: prismaUser.phone as string,
    }
    return user
}

export const createUser = async (
    email: string,
    password: string,
    name: string,
    phone: string
): Promise<User | null> => {
    const newUser = await prisma.user.create({
        data: {
            email: email,
            password: password,
            name: name,
            phone: phone,
        },
    })

    if (!newUser) {
        return null
    }
    const user: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name as string,
        role: newUser.role,
        phone: newUser.phone as string,
    }
    return user
}
