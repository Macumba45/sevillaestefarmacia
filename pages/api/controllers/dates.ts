import { prisma } from '@/lib/client'

export const deteleDateId = async (id: string) => {
    const date = await prisma.dates.delete({
        where: {
            id: id,
        },
    })

    return date
}
