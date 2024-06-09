<template>
    <AppModal :isOpen="isOpen" title="Filters" @onClose="onClose" v-if="isOpen">
        <div class="flex flex-col gap-8" v-if="step === STEPS.LOCATION">
            <AppHeading
                title="Where do you wanna go?"
                subtitle="Find the perfect location!"
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
        <div v-if="step === STEPS.DATE" class="flex flex-col gap-8">
            <AppHeading
                title="When do you plan to go?"
                subtitle="Make sure everyone is free!"
            />
            <AppCalendar :value="dateRange" @onChange="setDates" />
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
        <div class="flex flex-col gap-2 py-5">
            <div class="flex w-full items-center gap-4">
                <Button
                    v-if="secondaryActionLabel"
                    @click="onBack"
                    variant="outline"
                    type="button"
                    class="flex-1"
                >
                    {{ secondaryActionLabel }}
                </Button>
                <Button @click="onSubmit" type="button" class="flex-1">
                    {{ actionLabel }}
                </Button>
            </div>
        </div>
    </AppModal>
</template>

<script setup lang="ts">
import qs from 'query-string'
import VSelect from 'vue-select'
import { formatISO } from 'date-fns'

import type { Country, Range } from '~/types'

import 'vue-select/dist/vue-select.css'

const { isOpen, onClose, countries } = useSearchModal()
const route = useRoute()

const STEPS = reactive({
    LOCATION: 0,
    DATE: 1,
    INFO: 2,
})

const step = ref(STEPS.LOCATION)
const actionLabel = computed(() => {
    if (step.value === STEPS.INFO) {
        return 'Search'
    }
    return 'NEXT'
})
const secondaryActionLabel = computed(() => {
    if (step.value === STEPS.LOCATION) {
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

const location = ref<null | Country>(null)

const guestCount = ref(1)
const roomCount = ref(1)
const bathroomCount = ref(1)
const dateRange = reactive<Range>({
    start: new Date(),
    end: new Date(),
})
const setDates = (date: Range) => {
    dateRange.start = date.start
    dateRange.end = date.end
}

const queryString = computed(() => {
    //@ts-ignore
    return new URLSearchParams(route.query).toString()
})

const queryStringToObject = (query: string) =>
    [...new URLSearchParams(query)].reduce(
        //@ts-ignore
        (a, [k, v]) => ((a[k] = v), a),
        {},
    )

const router = useRouter()

const onSubmit = async () => {
    if (step.value !== STEPS.INFO) {
        return onNext()
    }

    let currentQuery = {}

    if (queryString) {
        currentQuery = queryStringToObject(queryString.value)
    }

    const updateQuery: any = {
        ...currentQuery,
        locationValue: location?.value?.value,
        guestCount: guestCount.value,
        roomCount: roomCount.value,
        bathroomCount: bathroomCount.value,
    }

    if (dateRange.start) {
        updateQuery.startDate = formatISO(dateRange.start)
    }
    if (dateRange.end) {
        updateQuery.endDate = formatISO(dateRange.end)
    }

    const url = qs.stringifyUrl(
        {
            url: '/',
            query: updateQuery,
        },
        {
            skipNull: true,
        },
    )

    step.value = 0
    onClose()
    router.push(url)
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
