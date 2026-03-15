import { DefaultSession } from 'next-auth'

// Module augmentation requires `interface` for declaration merging (TypeScript limitation)
declare module 'next-auth' {
    interface Session {
        user: {
            role: string
        } & DefaultSession['user']
    }
}
