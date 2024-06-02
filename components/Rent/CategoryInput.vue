<template>
    <div
        class="flex cursor-pointer flex-col gap-3 rounded-xl border-2 p-4 transition hover:border-black"
        :class="{ 'border-black': selected, 'border-neutral-200': !selected }"
    >
        <Icon :name="icon" size="30" />
        <div class="font-semibold">{{ label }}</div>
    </div>
</template>

<script setup lang="ts">
interface CategoryBoxProps {
    icon: string
    label: string
    selected?: boolean
}
const props = defineProps<CategoryBoxProps>()
</script>
