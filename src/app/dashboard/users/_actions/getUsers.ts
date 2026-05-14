'use server'

import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'

const PAGE_SIZE = 10

type GetUsersProps = {
    page: number
    search?: string
}

export type GetUsersResult = {
    users: Pick<User, 'id' | 'name' | 'role' | 'lastActive'>[]
    nextPage: number | undefined
    quantity?: number
}

export const getUsers = async ({ page, search }: GetUsersProps): Promise<GetUsersResult> => {
    const usersQuery = prisma.user.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: search,
                        mode: 'insensitive' as const,
                    },
                },
                {
                    email: {
                        contains: search,
                        mode: 'insensitive' as const,
                    },
                },
            ],
        },
        select: {
            id: true,
            name: true,
            role: true,
            lastActive: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: page * PAGE_SIZE,
        take: PAGE_SIZE,
    })

    const quantityQuery = page !== 0 ? undefined : prisma.user.count()

    const [users, quantity] = await Promise.all([usersQuery, quantityQuery])

    return {
        users,
        nextPage: users.length === PAGE_SIZE ? page + 1 : undefined,
        quantity,
    }
}
