<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const { isOpen, onClose, LoginSchema } = useLogin()
const { onOpen } = useRegister()
const isLoading = ref(false)

const formSchema = toTypedSchema(LoginSchema)
const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        email: '',
        password: '',
    },
})

const onSubmit = form.handleSubmit(async values => {
    try {
        isLoading.value = true

        const { data, error } = await useAsyncData(() =>
            $fetch('/api/auth/signin', {
                method: 'POST',
                body: values,
            }),
        )

        if (error.value) {
            return toast({
                title: error.value.statusCode.toString(),
                description: error.value.statusMessage,
                variant: 'destructive',
            })
        }

        const user = useUser()
        const res = await useRequestFetch()('/api/user')

        if (res) {
            user.value = res
        }

        return onClose()
    } catch (error) {
        toast({
            title: error as string,
            variant: 'destructive',
        })
    } finally {
        isLoading.value = false
    }
})

const toggleForm = () => {
    onClose() // Login model
    onOpen() // Register modal
}
</script>

<template>
    <AppModal
        :isOpen="isOpen"
        title="Welcome back"
        description="Login to your account"
        @onClose="onClose"
        v-if="isOpen"
    >
        <AppLoader class="my-5" v-if="isLoading" />
        <form @submit="onSubmit" class="space-y-4">
            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                            type="email"
                            placeholder="Email"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input
                            type="password"
                            placeholder="Password"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <div class="flex flex-col gap-2 py-6">
                <div class="flex w-full flex-row items-center gap-4">
                    <Button type="submit" :disabled="isLoading" class="w-full">
                        Submit
                    </Button>
                </div>
                <div class="mt-3 flex flex-col gap-4">
                    <hr />
                    <Button variant="outline" asChild>
                        <a href="/login/github">
                            <Icon name="uil:github" class="mr-2 size-5" />
                            Continue with Github
                        </a>
                    </Button>
                    <div class="mt-4 text-center font-light">
                        <p>
                            Don't have an account?
                            <span
                                class="cursor-pointer font-normal text-primary hover:underline"
                                @click="toggleForm"
                            >
                                Register
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </form>
    </AppModal>
</template>
