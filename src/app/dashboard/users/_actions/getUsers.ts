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
}

export const getUsers = async ({ page, search }: GetUsersProps): Promise<GetUsersResult> => {
    const users = await prisma.user.findMany({
        ...(search && {
            where: {
                OR: [
                    {
                        name: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        email: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        }),
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
