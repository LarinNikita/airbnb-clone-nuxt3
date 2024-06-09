<template>
    <DatePicker
        v-model.range="dateRange"
        color="gray"
        :disabled-dates="disabledDates"
        borderless
        expanded
    />
</template>

<script setup lang="ts">
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

import type { Range } from '~/types'

interface CalendarProps {
    value: Range
    disabledDates?: Date[]
}
const props = defineProps<CalendarProps>()
const emit = defineEmits<{
    (e: 'onChange', newDate: Range): void
}>()

const dateRange = ref(props.value)

watch(dateRange, newDate => {
    emit('onChange', newDate)
})
</script>

<style scoped></style>
