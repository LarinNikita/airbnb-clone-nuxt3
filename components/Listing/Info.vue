<template>
    <div class="col-span-4 flex flex-col gap-8">
        <div class="flex items-center gap-4">
            <img
                v-if="user && user.image"
                class="size-8 rounded-full"
                :src="user.image"
                :alt="user.name"
            />
            <Icon v-else name="radix-icons:avatar" class="size-8" />
            <div class="flex flex-col gap-2">
                <div
                    class="flex flex-row items-center gap-2 text-xl font-semibold"
                >
                    <div>Hosted by {{ user?.name }}</div>
                </div>
                <div
                    class="flex flex-row items-center gap-4 font-light text-neutral-500"
                >
                    <div>{{ guestCount }} guests</div>
                    <div>{{ roomCount }} rooms</div>
                    <div>{{ bathroomCount }} bathrooms</div>
                </div>
            </div>
        </div>
        <hr />
        <ListingCategory
            v-if="category"
            :icon="category.icon"
            :label="category.label"
            :description="category.description"
        />
        <hr />
        <div class="text-lg font-light text-neutral-500">
            {{ description }}
        </div>
        <hr />
        <RentMap :center="coordinates" />
    </div>
</template>

<script setup lang="ts">
import type { User } from '@prisma/client'

interface ListingInfoProps {
    user: User
    description: string
    guestCount: number
    roomCount: number
    bathroomCount: number
    category:
        | {
              icon: string
              label: string
              description: string
          }
        | undefined
    locationValue: string
}

const props = defineProps<ListingInfoProps>()
const { getByValue } = useRentModal()
const coordinates = computed(() => getByValue(props.locationValue)?.latlng)
</script>
