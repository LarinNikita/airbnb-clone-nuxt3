export default defineEventHandler(async event => {
    await validateRequest(event)

    const listingId = event.context.params?.listingId

    if (!listingId || typeof listingId !== 'string') {
        return createError({
            statusMessage: 'Invalid ID',
            status: 400,
        })
    }

    if (event.context.user) {
        const listing = await db.listing.deleteMany({
            where: {
                id: listingId,
                userId: event.context.user.id,
            },
        })

        return listing
    }
})
