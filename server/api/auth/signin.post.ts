import { verify } from '@node-rs/argon2'

export default eventHandler(async event => {
    const { email, password } = await readBody(event)

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

    const existingUser = await db.user.findUnique({
        where: { email },
    })

    if (!existingUser) {
        throw createError({
            statusMessage: 'Incorrect email or password',
            statusCode: 400,
        })
    }

    if (existingUser && existingUser.password) {
        const validPassword = await verify(existingUser.password, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        })

        if (!validPassword) {
            throw createError({
                message: 'Incorrect email or password',
                statusCode: 400,
            })
        }

        const session = await lucia.createSession(existingUser.id, {})
        appendHeader(
            event,
            'Set-Cookie',
            lucia.createSessionCookie(session.id).serialize(),
        )

        return true
    }
})
