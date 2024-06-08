<template>
    <div class="relative cursor-pointer transition hover:opacity-80">
        <Icon
            name="mdi:heart-outline"
            size="29"
            class="absolute -right-[2px] top-[0.5px] text-white"
        />
        <Icon
            name="ph:heart-fill"
            size="25"
            :class="[false ? 'text-rose-500' : 'text-neutral-500/70']"
        />
    </div>
</template>
