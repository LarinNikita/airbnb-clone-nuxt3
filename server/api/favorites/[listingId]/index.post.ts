import { validateRequest } from '~/server/utils/auth'

export default defineEventHandler(async event => {
    await validateRequest(event)

    assertMethod(event, ['POST', 'DELETE'])

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

    const listingId = event.context.params?.listingId

    if (!listingId || typeof listingId !== 'string') {
        return createError({
            statusMessage: 'Invalid ID',
            status: 400,
        })
    }

    let favoriteIds = [
        ...(currentUser.favoriteIds ? currentUser.favoriteIds : []),
    ]

    if (favoriteIds.includes(listingId)) {
        favoriteIds = favoriteIds.filter(id => id !== listingId)
    } else {
        favoriteIds.push(listingId)
    }

    const user = await db.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favoriteIds,
        },
    })

    return user
})
