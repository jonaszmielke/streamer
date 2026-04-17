'use server'

import { signIn } from '@/lib/auth'
import { hashPassword } from '@/lib/hash'
import { prisma } from '@/lib/prisma'

type ActionResult = {
    success: boolean
    error?: string
}

export const register = async (data: {
    name: string
    email: string
    password: string
}): Promise<ActionResult> => {
    const { name, email, password } = data

    if (!name || name.trim().length === 0) return { success: false, error: 'Username is required' }
    if (!email || !/^\S+@\S+$/.test(email)) return { success: false, error: 'Invalid email' }
    if (!password || password.length < 6)
        return { success: false, error: 'Password must be at least 6 characters' }

    try {
        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing) return { success: false, error: 'Email already registered' }

        const hashed = hashPassword(password)

        await prisma.user.create({
            data: {
                name: name.trim(),
                email,
                password: hashed,
            },
        })

        await signIn('credentials', { email, password, redirect: false })

        return { success: true }
    } catch (error) {
        console.error('Registration error:', error)
        return { success: false, error: 'An error occurred during registration' }
    }
}
