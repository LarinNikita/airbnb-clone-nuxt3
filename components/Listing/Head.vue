<template>
    <div>
        <AppHeading
            :title="title"
            :subtitle="`${location?.region}, ${location?.label}`"
            class="mb-4"
        />
        <div class="relative max-h-[40vh] w-full overflow-hidden rounded-xl">
            <img
                :src="imageSrc"
                :alt="title"
                fit="fill"
                class="w-full object-cover"
            />
            <div class="absolute right-5 top-5">
                <AppHeart :listing-id="id" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface ListingHeadProps {
    title: string
    locationValue: string
    imageSrc: string
    id: string
}

const props = defineProps<ListingHeadProps>()
const { getByValue } = useRentModal()
const location = computed(() => getByValue(props.locationValue))
</script>

<style scoped></style>
