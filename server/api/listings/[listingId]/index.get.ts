export default defineEventHandler(async event => {
    const listingId = event.context.params?.listingId

    if (!listingId || typeof listingId !== 'string') {
        return createError({
            statusMessage: 'Invalid ID',
            status: 400,
        })
    }

    const listing = await db.listing.findUnique({
        where: {
            id: listingId,
        },
        include: {
            user: true,
        },
    })

    return {
        ...listing,
        createdAt: listing?.createdAt.toString(),
    }
})
