<template>
    <AppEmptyState v-if="data?.length === 0" show-reset />
    <AppContainer>
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

const route = useRoute()
//@ts-ignore
const query = computed(() => new URLSearchParams(route.query).toString())
// const { data, error, pending, refresh } = await useFetch<SafeListings[]>(
//     `/api/listings?${query.value}`,
//     {
//         method: 'get',
//         key: 'listings',
//     },
// )

const { data, pending } = await useAsyncData<SafeListings[]>('listings', () =>
    //@ts-ignore
    $fetch(`/api/listings?${query.value}`),
)

watch(
    () => route.query,
    async () => {
        await refreshNuxtData('listings')
    },
)

definePageMeta({
    middleware: 'protected',
})
</script>
