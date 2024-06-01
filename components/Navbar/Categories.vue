<script setup lang="ts">
import { categories } from '~/constants'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const category = computed(() => useRoute().query.category)
</script>

<template>
    <AppContainer>
        <ScrollArea>
            <div class="flex items-center justify-between overflow-x-auto pt-4">
                <NavbarCategory
                    v-for="item in categories"
                    :key="item.icon"
                    :label="item.label"
                    :icon="item.icon"
                    :selected="item.label === category"
                >
                </NavbarCategory>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    </AppContainer>
</template>
