<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const { isOpen, onClose } = useRentModal()
const isLoading = ref(false)

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

<template>
    <AppModal
        :isOpen="isOpen"
        title="Airbnb your home"
        description=""
        @onClose="onClose"
        v-if="isOpen"
    >
        Rent Modal
    </AppModal>
</template>
