<template>
    <div class="h-[35vh] w-full rounded-lg">
        <!-- @vue-ignore -->
        <LMap
            ref="map"
            :zoom="6"
            :center="center ? center : [47.21322, -1.559482]"
        >
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                layer-type="base"
                name="OpenStreetMap"
            />
            <!-- @vue-ignore -->
            <LMarker v-if="center" :lat-lng="center">
                <!-- @vue-ignore -->
                <LIcon :icon-url="icon" :icon-size="size"></LIcon>
            </LMarker>
        </LMap>
    </div>
</template>

<script setup lang="ts">
interface Props {
    center?: number[]
}
const props = defineProps<Props>()

const width = ref(50)
const height = ref(50)

const icon = ref('/map-marker-area-line-svgrepo-com.svg')

const size = computed(() => [width.value, height.value])
</script>
