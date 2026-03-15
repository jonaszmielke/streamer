/* eslint-disable no-console */

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const main = async () => {
    const email = process.env.ADMIN_EMAIL
    const password = process.env.ADMIN_PASSWORD

    if (!email || !password) {
        console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set')
        process.exit(1)
    }

    const hash = await bcrypt.hash(password, 12)

    await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
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
