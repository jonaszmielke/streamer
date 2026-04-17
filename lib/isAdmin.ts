import { Role } from '@prisma/client'
import { auth } from '@/lib/auth'

const isAdmin = async () => {
    const session = await auth()
    return session?.user?.role === Role.ADMIN
}

export default isAdmin
