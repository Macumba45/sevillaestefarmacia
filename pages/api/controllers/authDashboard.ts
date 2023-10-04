import { PrismaClient } from '@prisma/client'
import { usersDashboard } from '../types/types'

const prisma = new PrismaClient()

export const findDashboardUser = async (
    email: string
): Promise<usersDashboard | null> => {
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
