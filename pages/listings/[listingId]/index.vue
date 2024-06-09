<template>
    <div>
        <AppContainer v-if="data">
            <div class="max-screen-lg mx-auto">
                <div class="flex flex-col gap-6">
                    <ListingHead
                        :id="data?.id"
                        :title="data?.title"
                        :locationValue="data?.locationValue"
                        :imageSrc="data?.imageSrc"
                    />
                    <div class="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
                        <ListingInfo
                            :user="data.user"
                            :category="category"
                            :description="data.description"
                            :roomCount="data.roomCount"
                            :guestCount="data.guestCount"
                            :bathroomCount="data.bathroomCount"
                            :locationValue="data.locationValue"
                        />
                        <div
                            class="order-first mb-10 md:order-last md:col-span-3"
                        >
                            <ListingReservation
                                :price="data.price"
                                :total-price="totalPrice"
                                :dateRange="dateRange"
                                :disabled="isLoading"
                                :disabledDates="disabledDates"
                                @on-change="setDates"
                                @submit-reservation="createReservation"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppContainer>
    </div>
</template>

<script setup lang="ts">
import { differenceInDays, eachDayOfInterval } from 'date-fns'
import type { User } from '@prisma/client'
import { categories } from '~/constants'
import type { SafeListings, Range } from '~/types'

const route = useRoute()

const { data } = await useFetch<SafeListings & { user: User }>(
    `/api/listings/${route.params.listingId}`,
)

const category = computed(() => {
    return categories.find(item => item.label === data.value?.category)
})

const initialDateRange = reactive<Range>({
    start: new Date(),
    end: new Date(),
})

const isLoading = ref(false)
const totalPrice = ref(data.value?.price)
const dateRange = ref<Range>(initialDateRange)
const reservations = ref<Date[]>([])
const disabledDates = computed(() => {
    let dates: Date[] = []

    reservations.value?.forEach((reservation: any) => {
        const range = eachDayOfInterval({
            start: new Date(reservation.startDate),
            end: new Date(reservation.endDate),
        })

        dates = [...dates, ...range]
    })

    return dates
})

const createReservation = async () => {}

watchEffect(() => {
    if (dateRange.value.start && dateRange.value.end) {
        const dayCount = differenceInDays(
            dateRange.value.end,
            dateRange.value.start,
        )

        if (dayCount && data.value?.price) {
            totalPrice.value = dayCount * data.value.price
        } else {
            totalPrice.value = data.value?.price
        }
    }
})

const setDates = (date: Range) => {
    dateRange.value.start = date.start
    dateRange.value.end = date.end
}
</script>

<style scoped></style>
