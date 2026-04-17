'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/lib/auth'

type ActionResult = {
    success: boolean
    error?: string
}

export const login = async (data: {
    email: string
    password: string
}): Promise<ActionResult> => {
    const { email, password } = data

    try {
        await signIn('credentials', { email, password, redirect: false })
        return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            return { success: false, error: 'Invalid email or password' }
        }
        throw error
    }
}
