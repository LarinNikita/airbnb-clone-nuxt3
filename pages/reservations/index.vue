<template>
    <AppEmptyState
        v-if="data?.length === 0"
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
    />
    <AppContainer v-else>
        <div
            class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
            <template v-if="!pending || !isLoading">
                <ListingCard
                    v-for="reservation in data"
                    :key="reservation.id"
                    :data="reservation.listing"
                    :reservation="reservation"
                    actionLabel="Cancel Reservation"
                    @on-action="cancelReservation"
                    :action-id="reservation.id"
                    :disabled="deletingId === reservation.id || isLoading"
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
    `/api/reservations?userId=${user.value?.id}`,
    {
        method: 'get',
        key: 'guestReservation',
    },
)

definePageMeta({
    middleware: 'protected',
})

const isLoading = ref(false)
const deletingId = ref('')
const cancelReservation = async (id: string) => {
    try {
        isLoading.value = true
        deletingId.value = id
        const { error: deleteError } = await useAsyncData(() =>
            //@ts-ignore
            $fetch(`/api/reservations/${id}`, {
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
