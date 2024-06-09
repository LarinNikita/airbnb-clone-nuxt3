export default defineEventHandler(async event => {
    const query = getQuery(event)

    const userId = query?.userId
    const roomCount = query?.roomCount
    const guestCount = query?.guestCount
    const bathroomCount = query?.bathroomCount
    const locationValue = query?.locationValue
    const startDate = query?.startDate
    const endDate = query?.endDate
    const category = query?.category

    const queryParams: any = {}

    if (userId) {
        queryParams.userId = userId
    }
    if (category) {
        queryParams.category = category
    }
    if (roomCount) {
        queryParams.roomCount = {
            gte: +roomCount,
        }
    }
    if (guestCount) {
        queryParams.guestCount = {
            gte: +guestCount,
        }
    }
    if (bathroomCount) {
        queryParams.bathroomCount = {
            gte: +bathroomCount,
        }
    }
    if (locationValue) {
        queryParams.locationValue = locationValue
    }

    if (startDate && endDate) {
        queryParams.NOT = {
            reservations: {
                some: {
                    OR: [
                        {
                            endDate: { gte: startDate },
                            startDate: { lte: startDate },
                        },
                        {
                            startDate: { lte: endDate },
                            endDate: { gte: endDate },
                        },
                    ],
                },
            },
        }
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
