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
const { data, error, pending } = await useFetch('/api/listings', {
    method: 'get',
    key: 'listings',
})

definePageMeta({
    middleware: 'protected',
})
</script>
