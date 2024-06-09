export default defineEventHandler(async event => {
    const query = getQuery(event)
    const userId = query?.userId

    const queryParams: any = {}

    if (userId) {
        queryParams.userId = userId
    }

    const listings = await db.listing.findMany({
        where: queryParams,
        orderBy: {
            createdAt: 'desc',
        },
    })

    const safeListings = listings.map(listing => {
        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }
    })

    return safeListings
})
