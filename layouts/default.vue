<template>
    <div>
        <Navbar />
        <div class="pb-20 pt-[220px]">
            <slot />
        </div>
        <AuthRegister />
        <AuthLogin />
        <RentModal />
        <ListingSearch />
    </div>
</template>

<script setup lang="ts"></script>
