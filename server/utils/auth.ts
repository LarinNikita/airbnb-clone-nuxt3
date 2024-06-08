import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { PrismaClient } from '@prisma/client'
import { GitHub } from 'arctic'
import type { H3Event } from 'h3'

export const db = new PrismaClient()

const adapter = new PrismaAdapter(db.session, db.user)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !import.meta.dev,
        },
    },
    getUserAttributes: attributes => {
        return {
            // attributes has the type of DatabaseUserAttributes
            githubId: attributes.github_id,
            name: attributes.name,
            image: attributes.image,
            email: attributes.email,
        }
    },
})

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia
        DatabaseUserAttributes: DatabaseUserAttributes
    }
}

interface DatabaseUserAttributes {
    github_id: number
    name: string
    image: string
    email: string
}

export const github = new GitHub(
    process.env.GITHUB_CLIENT_ID!,
    process.env.GITHUB_CLIENT_SECRET!,
)

export const validateRequest = async (event: H3Event) => {
    if (!event.context.user) {
        throw createError({
            statusMessage: 'Unauthorized',
            status: 401,
        })
    }
}
