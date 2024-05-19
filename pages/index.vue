<script setup lang="ts">
import { Button } from '@/components/ui/button'

const user = useUser()

async function logout() {
    await $fetch('/api/logout', {
        method: 'POST',
    })
    await navigateTo('/login')
}

definePageMeta({
    middleware: 'protected',
})
</script>

<template>
    <div>
        <pre
            >{{ user }}
        </pre>
        <form @submit.prevent="logout">
            <Button>Sign out</Button>
        </form>
    </div>
</template>

<style scoped></style>
