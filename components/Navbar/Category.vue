<script setup lang="ts">
interface CategoryProps {
    icon: string
    label: string
    selected?: boolean
}

const props = defineProps<CategoryProps>()
</script>

<template>
    <div
        class="flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-primary"
        :class="{
            'border-b-primary text-primary': selected,
            'border-transparent text-neutral-500': !selected,
        }"
    >
        <Icon :name="icon" size="26" />
        <div class="text-sm font-medium">{{ label }}</div>
    </div>
</template>
