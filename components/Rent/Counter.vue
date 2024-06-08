<template>
    <div class="flex flex-row items-center justify-between">
        <div class="flex flex-col">
            <div class="font-medium">
                {{ title }}
            </div>
            <div class="font-light text-gray-600">
                {{ subtitle }}
            </div>
        </div>
        <div class="flex flex-row items-center gap-4">
            <div
                class="flex size-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80"
                @click="onReduce"
            >
                <Icon name="ant-design:minus-outline" />
            </div>
            <div class="text-xl font-light text-neutral-600">{{ value }}</div>
            <div
                class="flex size-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80"
                @click="onAdd"
            >
                <Icon name="ant-design:plus-outline" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface CounterProps {
    title: string
    subtitle: string
    value: number
}

const props = defineProps<CounterProps>()
const emit = defineEmits<{
    (e: 'change', value: number): void
}>()

const onAdd = () => {
    emit('change', props.value + 1)
}

const onReduce = () => {
    if (props.value === 1) {
        return
    }

    emit('change', props.value - 1)
}
</script>
