<template>
    <div
        @click="handleFavorite"
        class="relative cursor-pointer transition hover:opacity-80"
    >
        <Icon
            name="mdi:heart-outline"
            size="29"
            class="absolute -right-[2px] top-[0.5px] text-white"
        />
        <Icon
            name="ph:heart-fill"
            size="25"
            :class="[isFavorite ? 'text-rose-500' : 'text-neutral-500/70']"
        />
    </div>
</template>

<script setup lang="ts">
import { useFavorite } from '~/composables/useFavorite'

interface HeartButtonProps {
    listingId: string
}

const props = defineProps<HeartButtonProps>()

const { isFavorite, toggleFavorite } = await useFavorite({
    listingId: props.listingId,
})

const handleFavorite = async (e: MouseEvent) => {
    await toggleFavorite(e)
}
</script>
