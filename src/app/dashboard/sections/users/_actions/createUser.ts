'use server'

import isAdmin from '@/lib/isAdmin'
import { prisma } from '@/lib/prisma'
import { Role } from '@prisma/client'

type CreateUserProps = {
    name: string
    email: string
    role: Role
}

type CreateUserResultSuccess = {
    success: true
    userId: string
}

type CreateUserResultError = {
    success: false
    error: string
}

type CreateUserResult = CreateUserResultSuccess | CreateUserResultError

export const createUser = async ({
    name,
    email,
    role,
}: CreateUserProps): Promise<CreateUserResult> => {
    if (!(await isAdmin())) return { success: false, error: 'Unauthorized' }

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ name }, { email }],
        },
        select: {
            name: true,
            email: true,
        },
    })

    if (existingUser)
        return {
            success: false,
            error: `User with this ${name === existingUser.name ? 'name' : 'email'} already exists`,
        }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: 'password', //TODO: Implement proper password generation
            role,
        },
        select: {
            id: true,
        },
    })

    return { success: true, userId: user.id }
}
