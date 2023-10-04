import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const findDashboardUser = async (email: string) => {
    const user = await prisma.usersDashboard.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
            email: true,
            password: false,
        },
    })
    return user
}
