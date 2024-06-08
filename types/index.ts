import type { Listing } from '@prisma/client'

export type Country = {
    flag: string
    label: string
    latlng: number[]
    region: string
    value: string
}

export type SafeListings = Omit<Listing, 'createdAt'> & {
    createdAt: string
}
