import { validateRequest } from '~/server/utils/auth'

export default defineEventHandler(async event => {
    await validateRequest(event)

    const currentUser = await db.user.findUnique({
        where: {
            email: event.context.user?.email,
        },
    })

    if (!currentUser) {
        return createError({
            message: 'Unauthenticated',
            status: 403,
        })
    }

    return currentUser
})
