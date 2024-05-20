<template>
    <div
        class="w-full cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md md:w-auto"
    >
        <div class="flex flex-row items-center justify-between">
            <div class="px-6 text-sm font-semibold">Anywhere</div>
            <div
                class="hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold sm:block"
            >
                Any Week
            </div>
            <div
                class="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600"
            >
                <div class="hidden sm:block">Add Guests</div>
                <div
                    class="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                    <Icon name="heroicons-outline:search" size="18" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
