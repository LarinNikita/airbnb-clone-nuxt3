<template>
    <AppEmptyState
        v-if="data?.length === 0"
        title="No favorites found"
        subtitle="Looks like you have no favorite listing."
    />
    <AppContainer v-else>
        <div
            class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
            <template v-if="!pending">
                <ListingCard
                    v-for="listing in data"
                    :key="listing.id"
                    :data="listing"
                />
            </template>
            <template v-else>
                <ListingLoader v-for="n in 8" :key="n" />
            </template>
        </div>
    </AppContainer>
</template>

<script setup lang="ts">
import type { SafeListings } from '~/types'

const { data, error, pending } = await useFetch<SafeListings[]>(
    `/api/favorites`,
    {
        method: 'get',
        key: 'favorites',
    },
)

definePageMeta({
    middleware: 'protected',
})
</script>
