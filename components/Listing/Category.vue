<template>
    <div class="flex flex-col gap-6">
        <div class="flex flex-row items-center gap-4">
            <Icon size="40" :name="icon" class="text-neutral-400" />
            <div class="flex flex-col">
                <div class="text-lg font-semibold">
                    {{ label }}
                </div>
                <div class="font-light text-neutral-500">
                    {{ description }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface CategoryViewProps {
    icon: string
    label: string
    description: string
}

defineProps<CategoryViewProps>()
</script>
