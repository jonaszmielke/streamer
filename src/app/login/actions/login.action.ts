'use server'

import { LoginFormValues } from '../types'
import { signIn } from '@/lib/auth'
import { AuthError } from 'next-auth'

type ActionResult = {
    success: boolean
    error?: string
}

export const login = async ({ email, password }: LoginFormValues): Promise<ActionResult> => {
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
