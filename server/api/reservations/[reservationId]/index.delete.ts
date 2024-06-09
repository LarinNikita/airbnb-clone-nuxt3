export default defineEventHandler(async event => {
    await validateRequest(event)

    const reservationId = event.context.params?.reservationId

    if (!reservationId || typeof reservationId !== 'string') {
        return createError({
            statusMessage: 'Invalid ID',
            status: 400,
        })
    }

    if (event.context.user) {
        const reservation = await db.reservation.deleteMany({
            where: {
                id: reservationId,
                OR: [
                    {
                        userId: event.context.user.id,
                    },
                    {
                        listing: {
                            userId: event.context.user.id,
                        },
                    },
                ],
            },
        })

        return reservation
    }
})
