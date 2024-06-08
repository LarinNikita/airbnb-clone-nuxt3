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
                    </div>
                </div>
            </div>
        </AppContainer>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@prisma/client'
import { categories } from '~/constants'
import type { SafeListings } from '~/types'

const route = useRoute()

const { data } = await useFetch<SafeListings & { user: User }>(
    `/api/listings/${route.params.listingId}`,
)
const category = computed(() => {
    return categories.find(item => item.label === data.value?.category)
})
</script>

<style scoped></style>
