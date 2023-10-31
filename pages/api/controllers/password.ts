import { prisma } from '@/lib/client'

export const findEmailToRecover = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })
    return user
}
