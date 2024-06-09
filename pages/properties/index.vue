<template>
    <AppEmptyState
        v-if="data?.length === 0"
        title="No properties found"
        subtitle="Looks like you have no properties."
    />
    <AppContainer v-else>
        <div
            class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
            <template v-if="!pending || !isLoading">
                <ListingCard
                    v-for="listing in data"
                    :key="listing.id"
                    :data="listing"
                    actionLabel="Delete Property"
                    @on-action="deleteProperty"
                    :action-id="listing.id"
                    :disabled="deletingId === listing.id || isLoading"
                />
            </template>
            <template v-else>
                <ListingLoader v-for="n in 8" :key="n" />
            </template>
        </div>
    </AppContainer>
</template>

<script setup lang="ts">
import { useToast } from '~/components/ui/toast'

const user = useUser()
const { toast } = useToast()

const { data, error, pending } = await useFetch(
    `/api/listings?userId=${user.value?.id}`,
    {
        method: 'get',
        key: 'userProperties',
    },
)

definePageMeta({
    middleware: 'protected',
})

const isLoading = ref(false)
const deletingId = ref('')
const deleteProperty = async (id: string) => {
    try {
        isLoading.value = true
        deletingId.value = id
        const { error: deleteError } = await useAsyncData(() =>
            //@ts-ignore
            $fetch(`/api/listings/${id}`, {
                method: 'DELETE',
            }),
        )

        if (!deleteError.value) {
            toast({
                title: 'Reservation is cancelled',
            })

            refreshNuxtData('guestReservation')
        }
    } catch (error) {
        console.log(error)
    } finally {
        isLoading.value = false
    }
}
</script>
