<script setup lang="ts">
interface HeadingProps {
    title: string
    subtitle?: string
    center?: boolean
}
defineProps<HeadingProps>()
</script>

<template>
    <div :class="[center ? 'text-center' : 'text-left']">
        <div class="text-2xl font-bold">
            {{ title }}
        </div>
        <div class="mt-2 font-light text-neutral-500">
            {{ subtitle }}
        </div>
    </div>
</template>
