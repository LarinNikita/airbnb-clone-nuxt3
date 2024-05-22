import { hash } from '@node-rs/argon2'
import { generateIdFromEntropySize } from 'lucia'

export default eventHandler(async event => {
    const { email, name, password } = await readBody(event)

    if (typeof name !== 'string' || name.length < 3 || name.length > 31) {
        throw createError({
            statusMessage: 'Invalid name',
            statusCode: 400,
        })
    }

    if (typeof email !== 'string' || email.length < 3 || email.length > 31) {
        throw createError({
            statusMessage: 'Invalid email',
            statusCode: 400,
        })
    }

    if (
        typeof password !== 'string' ||
        password.length < 6 ||
        password.length > 255
    ) {
        throw createError({
            statusMessage: 'Invalid password',
            statusCode: 400,
        })
    }

    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    })

    const userId = generateIdFromEntropySize(10) // 16 characters long

    const existingUser = await db.user.findUnique({
        where: { email },
    })

    if (existingUser) {
        throw createError({
            statusMessage: 'User Already exist',
            statusCode: 400,
        })
    }

    await db.user.create({
        data: {
            id: userId,
            email,
            name,
            password: passwordHash,
        },
    })

    const session = await lucia.createSession(userId, {})
    appendHeader(
        event,
        'Set-Cookie',
        lucia.createSessionCookie(session.id).serialize(),
    )

    return true
})
