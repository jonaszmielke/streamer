/* eslint-disable no-console */

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/hash'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const main = async () => {
    const email = process.env.ADMIN_EMAIL
    const password = process.env.ADMIN_PASSWORD

    if (!email || !password) {
        console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set')
        process.exit(1)
    }

    const hash = hashPassword(password)

    await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            name: 'Admin',
            email,
            password: hash,
            role: 'ADMIN',
        },
    })

    console.log(`Admin user seeded: ${email}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => prisma.$disconnect())
