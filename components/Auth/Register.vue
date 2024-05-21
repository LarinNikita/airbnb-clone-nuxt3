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

const { isOpen, onClose, RegisterSchema } = useRegister()

const formSchema = toTypedSchema(RegisterSchema)
const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        email: '',
        name: '',
        password: '',
    },
})

const onSubmit = form.handleSubmit(values => {
    console.log('Form submitted!', values)
})
</script>

<template>
    <AppModal
        :isOpen="isOpen"
        title="Welcome back"
        description="Login to your account"
        @onClose="onClose"
        v-if="isOpen"
    >
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
            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input
                            type="text"
                            placeholder="Name"
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
                    <Button type="submit" :disabled="false" class="w-full">
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
                            Already have an account?
                            <span
                                class="cursor-pointer font-normal text-primary hover:underline"
                            >
                                Log in
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </form>
    </AppModal>
</template>
