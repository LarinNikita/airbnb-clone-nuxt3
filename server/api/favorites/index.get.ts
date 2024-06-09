export default defineEventHandler(async event => {
    await validateRequest(event)

    const user = await db.user.findUnique({
        where: {
            email: event.context.user?.email,
        },
    })

    if (!user) {
        return createError({
            statusMessage: 'Unauthenticated',
            status: 403,
        })
    }

    const favorites = await db.listing.findMany({
        where: {
            id: {
                in: [...(user.favoriteIds || [])],
            },
        },
    })

    const safeFavorites = favorites.map(listing => ({
        ...listing,
        createdAt: listing.createdAt.toISOString(),
    }))

    return safeFavorites
})
