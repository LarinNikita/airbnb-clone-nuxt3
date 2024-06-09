<template>
    <div class="fixed z-10 w-full bg-white shadow-sm">
        <div class="border-b-[1px] py-4">
            <AppContainer>
                <div class="flex items-center justify-between gap-3 md:gap-0">
                    <NavbarLogo />
                    <NavbarSearch @click="onOpen" />
                    <NavbarUserMenu />
                </div>
            </AppContainer>
        </div>
        <NavbarCategories />
    </div>
</template>

<script setup lang="ts">
const { onOpen } = useSearchModal()
</script>
