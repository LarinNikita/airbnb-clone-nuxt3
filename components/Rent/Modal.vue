<template>
    <AppModal
        :isOpen="isOpen"
        title="Airbnb your home"
        description=""
        @onClose="onClose"
        v-if="isOpen"
    >
        <div class="flex flex-col gap-8" v-if="step === STEPS.CATEGORY">
            <AppHeading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />
            <ScrollArea class="px-3">
                <div class="grid max-h-[50vh] grid-cols-1 gap-3 md:grid-cols-2">
                    <div
                        class="col-span-1"
                        v-for="item in categories"
                        :key="item.icon"
                    >
                        <RentCategoryInput
                            :label="item.label"
                            :icon="item.icon"
                            :selected="category === item.label"
                            @click="category = item.label"
                        />
                    </div>
                </div>
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        </div>
        <div class="flex flex-col gap-8" v-if="step === STEPS.LOCATION">
            <AppHeading
                title="Where is your place located?"
                subtitle="Help guests find you!"
            />
            <ClientOnly>
                <VSelect
                    v-model="location"
                    name="location"
                    :options="countries"
                >
                    <template v-slot:option="country">
                        <div class="flex items-center gap-3 text-lg">
                            <div>
                                <!-- @vue-ignore -->
                                {{ country.flag }}
                            </div>
                            <div>
                                <!-- @vue-ignore -->
                                {{ country.label }}
                                <span class="ml-1 text-neutral-500">
                                    <!-- @vue-ignore -->
                                    {{ country.region }}
                                </span>
                            </div>
                        </div>
                    </template>
                </VSelect>
            </ClientOnly>
            <ClientOnly>
                <RentMap :center="location?.latlng" />
            </ClientOnly>
        </div>
        <div class="flex flex-col gap-8" v-if="step === STEPS.INFO">
            <AppHeading
                title="Share some basics about your place"
                subtitle="What amenities do you have?"
            />
            <RentCounter
                title="Guests"
                subtitle="How many guests do you allow?"
                :value="guestCount"
                @change="
                    (val: number) => {
                        guestCount = val
                    }
                "
            />
            <hr />
            <RentCounter
                title="Rooms"
                subtitle="How many rooms do you have?"
                :value="roomCount"
                @change="
                    (val: number) => {
                        roomCount = val
                    }
                "
            />
            <hr />
            <RentCounter
                title="Bathrooms"
                subtitle="How many bathrooms do you have?"
                :value="bathroomCount"
                @change="
                    (val: number) => {
                        bathroomCount = val
                    }
                "
            />
        </div>
        <div class="flex flex-col gap-8" v-if="step === STEPS.IMAGES">
            <AppHeading
                title="Add a photo of your place"
                subtitle="Show guests what your place looks like!"
            />
            <div
                @click="openWidget"
                class="relative flex cursor-pointer flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-20 text-neutral-600 transition hover:opacity-70"
            >
                <Icon v-if="!imageUrl" size="50" name="tabler:photo-plus" />
                <div v-if="!imageUrl" class="text-lg font-semibold">
                    Click to upload
                </div>
                <div v-else class="absolute inset-0 size-full">
                    <img
                        :src="imageUrl"
                        alt="House"
                        class="size-full object-cover"
                    />
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-2 py-5">
            <div class="flex w-full items-center gap-4">
                <Button
                    v-if="secondaryActionLabel"
                    :disabled="isLoading"
                    @click="onBack"
                    variant="outline"
                    type="button"
                    class="flex-1"
                >
                    {{ secondaryActionLabel }}
                </Button>
                <Button
                    :disabled="isLoading"
                    @click="onNext"
                    type="button"
                    class="flex-1"
                >
                    {{ actionLabel }}
                </Button>
            </div>
        </div>
    </AppModal>
</template>

<script setup lang="ts">
import VSelect from 'vue-select'

import type { Country } from '~/types'
import { categories } from '~/constants'

import { useToast } from '@/components/ui/toast/use-toast'

import 'vue-select/dist/vue-select.css'

const { toast } = useToast()
const { imageUrl, openWidget } = useCloudinary()
const { isOpen, onClose, countries, getByValue } = useRentModal()
const isLoading = ref(false)

const STEPS = reactive({
    CATEGORY: 0,
    LOCATION: 1,
    INFO: 2,
    IMAGES: 3,
    DESCRIPTION: 4,
    PRICE: 5,
})

const step = ref(STEPS.CATEGORY)
const actionLabel = computed(() => {
    if (step.value === STEPS.PRICE) {
        return 'Create'
    }
    return 'NEXT'
})
const secondaryActionLabel = computed(() => {
    if (step.value === STEPS.CATEGORY) {
        return undefined
    }
    return 'Back'
})

const onBack = () => {
    step.value = step.value - 1
}
const onNext = () => {
    step.value = step.value + 1
}

const category = ref('')
const location = ref<null | Country>(null)

const guestCount = ref(1)
const roomCount = ref(1)
const bathroomCount = ref(1)

const onSubmit = async () => {
    try {
        isLoading.value = true
    } catch (error) {
        toast({
            title: error as string,
            variant: 'destructive',
        })
    } finally {
        isLoading.value = false
    }
}
</script>

<style>
:root {
    --vs-dropdown-option--active-bg: #ffe4e6;
    --vs-dropdown-option--active-color: #000000;
}
.vs__selected {
    @apply text-lg;
}
.vs__dropdown-menu {
    overflow-x: hidden;
}
</style>
