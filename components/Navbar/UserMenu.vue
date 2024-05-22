<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const { onOpen: registerModal } = useRegister()
const { onOpen: loginModal } = useLogin()

const user = useUser()

async function logout() {
    await $fetch('/api/logout', {
        method: 'POST',
    })
    user.value = null
    loginModal()
}
</script>

<template>
    <div class="relative">
        <div class="flex flex-row items-center gap-3">
            <div
                class="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
            >
                Airbnb your home
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button
                        class="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:bg-transparent hover:shadow-md md:px-2"
                        variant="ghost"
                        size="sm"
                    >
                        <Icon name="ant-design:menu-outline" />
                        <Icon name="radix-icons:avatar" class="size-6" />
                        <!-- <div class="hidden md:block">
                            <img
                                class="size-6 rounded-full"
                                v-if="user && user.image"
                                :alt="user.name"
                                :src="user.image"
                            />
                            <Icon
                                v-else
                                name="radix-icons:avatar"
                                class="size-6"
                            />
                        </div> -->
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56" align="end">
                    <template v-if="user">
                        <DropdownMenuItem @click="navigateTo('/trips')">
                            <span>My trips</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="navigateTo('/reservations')">
                            <span>Reservations</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="navigateTo('/favorites')">
                            <span>My favorites</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="navigateTo('/properties')">
                            <span>My properties</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem> Airbnb your home </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem @click="logout">
                            <Icon name="lucide:log-out" class="mr-2 size-4" />
                            Logout
                        </DropdownMenuItem>
                    </template>
                    <template v-else>
                        <DropdownMenuItem @click="registerModal">
                            <span>Register</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="loginModal">
                            <span>Login</span>
                        </DropdownMenuItem>
                    </template>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
</template>
