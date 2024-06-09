import type { Listing, Reservation } from '@prisma/client'

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

export interface Range {
    start: Date
    end: Date
}

export type SafeReservation = Omit<
    Reservation,
    'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
    createdAt: string
    startDate: string
    endDate: string
    listing: SafeListings
}
