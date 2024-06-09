export default defineEventHandler(async event => {
    const query = getQuery(event)
    const listingId = query?.listingId
    const userId = query?.userId
    const authorId = query?.authorId
    const queryParams: any = {}

    if (listingId) {
        queryParams.listingId = listingId
    }

    if (userId) {
        queryParams.userId = userId
    }

    if (authorId) {
        queryParams.listing = authorId
    }

    const reservations = await db.reservation.findMany({
        where: queryParams,
        include: {
            listing: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    const safeReservations = reservations.map(reservation => ({
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
            ...reservation.listing,
            createdAt: reservation.listing.createdAt.toISOString(),
        },
    }))

    return safeReservations
})
