<template>
    <!-- @vue-ignore -->
    <Card
        class="group col-span-1 cursor-pointer rounded-xl border-0 shadow-none"
    >
        <CardContent class="grid gap-4 p-0">
            <dir
                class="relative aspect-square h-[200px] w-full overflow-hidden rounded-xl p-0"
            >
                <img
                    :src="data.imageSrc"
                    :alt="data.title"
                    class="size-full object-cover transition group-hover:scale-110"
                />
                <div class="absolute right-3 top-3">
                    <AppHeart :listing-id="data.id" />
                </div>
            </dir>
            <div class="text-lg font-semibold">
                {{ location?.region }}, {{ location?.label }}
            </div>
            <div class="line-clamp-1 font-light text-neutral-500">
                {{ data.category }}
            </div>
            <div class="flex flex-row items-center gap-1">
                <div class="font-semibold">$ {{ data.price }}</div>
            </div>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import type { SafeListings } from '~/types'

interface ListingCardProps {
    data: SafeListings
    disabled?: boolean
    actionLabel?: string
    actionId?: string
}

const props = defineProps<ListingCardProps>()
const { getByValue } = useRentModal()
const location = toRef(() => getByValue(props.data.locationValue))
</script>

<style scoped></style>
