export default defineEventHandler(async event => {
    const listings = await db.listing.findMany({
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
