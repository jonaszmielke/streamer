'use server'

import { User } from '@prisma/client'
import { prisma } from '@/lib/prisma'

const PAGE_SIZE = 10

export type GetUsersResult = {
    users: Pick<User, 'id' | 'name' | 'role' | 'lastActive'>[]
    nextPage: number | undefined
}

export const getUsers = async (page: number): Promise<GetUsersResult> => {
    const users = await prisma.user.findMany({
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

    return {
        users,
        nextPage: users.length === PAGE_SIZE ? page + 1 : undefined,
    }
}
