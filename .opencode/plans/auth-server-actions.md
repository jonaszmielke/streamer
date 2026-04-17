# Plan: Server Actions for Registration & Sign-In (SHA3-256)

## Overview

Replace bcrypt with SHA3-256 hashing using `PASSWORD_SALT` from env. Create server actions for registration and login. Integrate with NextAuth. Auto sign-in after registration.

## Hashing Strategy

- Use a single `PASSWORD_SALT` env var (shared across all users) instead of per-user random salts.
- `hashPassword(password)` = `sha3-256(PASSWORD_SALT + password)` → hex string.
- `verifyPassword(password, storedHash)` = `hashPassword(password) === storedHash`.
- Uses Node.js built-in `crypto.createHash('sha3-256')` — no new dependencies.

## Files to Change

### 1. CREATE `lib/hash.ts` — SHA3-256 hash/verify utility

```ts
import { createHash } from 'crypto'

const getSalt = () => {
    const salt = process.env.PASSWORD_SALT
    if (!salt) throw new Error('PASSWORD_SALT environment variable is not set')
    return salt
}

export const hashPassword = (password: string): string => {
    const salt = getSalt()
    return createHash('sha3-256')
        .update(salt + password)
        .digest('hex')
}

export const verifyPassword = (password: string, storedHash: string): boolean => {
    return hashPassword(password) === storedHash
}
```

### 2. EDIT `lib/auth.ts` — Replace bcrypt with SHA3-256

- Remove: `import bcrypt from 'bcryptjs'`
- Add: `import { verifyPassword } from '@/lib/hash'`
- Replace line `const valid = await bcrypt.compare(password, user.password)` with `const valid = verifyPassword(password, user.password)`

### 3. EDIT `prisma/seed.ts` — Replace bcrypt + fix missing name

- Remove: `import bcrypt from 'bcryptjs'`
- Add: `import { hashPassword } from '../lib/hash'`
- Replace: `const hash = await bcrypt.hash(password, 12)` → `const hash = hashPassword(password)`
- Add `name: 'Admin'` to the `create` block of `prisma.user.upsert`

### 4. WRITE `app/register/_actions/register.action.ts` — Registration server action

```ts
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
    } catch {
        return { success: false, error: 'An error occurred during registration' }
    }
}
```

### 5. WRITE `app/login/actions/login.action.ts` — Login server action

```ts
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
```

### 6. EDIT `app/register/page.tsx` — Use server action

- Remove the entire `fetch('/api/auth/register')` block in `handleSubmit`.
- Add import: `import { register } from './_actions/register.action'`
- Replace `handleSubmit` body:

```ts
const handleSubmit = async (values: RegisterFormValues) => {
    setError('')
    setLoading(true)

    try {
        const result = await register({
            name: values.username,
            email: values.email,
            password: values.password,
        })

        if (!result.success) {
            setError(result.error || 'Registration failed')
        } else {
            router.push('/')
            router.refresh()
        }
    } catch {
        setError('An error occurred during registration')
    } finally {
        setLoading(false)
    }
}
```

### 7. EDIT `app/login/page.tsx` — Use server action

- Remove: `import { signIn } from 'next-auth/react'`
- Add: `import { login } from './actions/login.action'`
- Replace `handleSubmit` body:

```ts
const handleSubmit = async (values: LoginFormValues) => {
    setError('')
    setLoading(true)

    try {
        const result = await login({
            email: values.email,
            password: values.password,
        })

        if (!result.success) {
            setError(result.error || 'Invalid email or password')
        } else {
            router.push('/')
            router.refresh()
        }
    } catch {
        setError('An error occurred during login')
    } finally {
        setLoading(false)
    }
}
```

## Env Update

Add `PASSWORD_SALT` to `.env` and `.env.example`.

## Verification

Run `yarn typecheck` after all changes to confirm compilation.
