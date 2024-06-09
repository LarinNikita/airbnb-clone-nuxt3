import { validateRequest } from '~/server/utils/auth'

export default defineEventHandler(async event => {
    await validateRequest(event)

    const { listingId, startDate, endDate, totalPrice } = await readBody(event)

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return createError({
            statusMessage: 'Field are missing',
            statusCode: 400,
        })
    }

    if (event.context.user) {
        const listingReservation = await db.listing.update({
            where: {
                id: listingId,
            },
            data: {
                reservations: {
                    create: {
                        userId: event.context.user.id,
                        startDate,
                        endDate,
                        totalPrice,
                    },
                },
            },
        })

        return listingReservation
    }
})
