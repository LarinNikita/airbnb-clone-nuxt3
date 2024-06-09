<template>
    <div
        class="overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white"
    >
        <div class="flex flex-row items-center gap-1 p-4">
            <div class="text-2xl font-semibold">$ {{ price }}</div>
            <div class="font-light text-neutral-600">night</div>
        </div>
        <hr />
        <div class="py-2">
            <AppCalendar
                :disabled-dates="disabledDates"
                :value="dateRange"
                @onChange="changeDate"
            />
        </div>
        <hr />
        <div class="p-4">
            <Button
                :disabled="disabled"
                @click="submitReservation"
                class="w-full"
            >
                Reserve
            </Button>
        </div>
        <hr />
        <div
            class="flow-row flex items-center justify-between p-4 text-lg font-semibold"
        >
            <div>Total</div>
            <div>$ {{ totalPrice }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Range } from '~/types'

interface ListingReservationProps {
    price: number
    dateRange: Range
    totalPrice?: number
    disabled?: boolean
    disabledDates: Date[]
}
defineProps<ListingReservationProps>()

const emit = defineEmits<{
    (e: 'onChange', newDate: Range): void
    (e: 'submitReservation'): void
}>()

const changeDate = (newDate: Range) => {
    emit('onChange', newDate)
}

const submitReservation = () => {
    emit('submitReservation')
}
</script>
