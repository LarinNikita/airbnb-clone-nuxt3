import { validateRequest } from '~/server/utils/auth'

export default defineEventHandler(async event => {
    await validateRequest(event)

    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
    } = await readBody(event)

    if (event.context.user) {
        const listing = await db.listing.create({
            data: {
                title,
                description,
                imageSrc,
                category,
                roomCount,
                bathroomCount,
                guestCount,
                locationValue: location.value,
                price,
                userId: event.context.user.id,
            },
        })

        return listing
    }
})
