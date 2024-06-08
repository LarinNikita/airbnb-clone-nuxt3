<template>
    <div class="flex h-[60vh] flex-col items-center justify-center gap-2">
        <AppHeading
            center
            :title="title ? title : 'No exact matches'"
            :subtitle="
                subtitle
                    ? subtitle
                    : 'Try changing or removing some of your filters.'
            "
        />
        <div
            v-if="showReset"
            class="mt-4 flex w-48 items-center justify-center"
        >
            <Button outline @click="$router.push('/')">
                Remove all filters
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
interface EmptyStateProps {
    title?: string
    subtitle?: string
    showReset?: boolean
}
defineProps<EmptyStateProps>()
</script>
