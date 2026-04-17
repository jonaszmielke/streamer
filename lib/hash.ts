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
