export default defineNuxtRouteMiddleware(async () => {
    const user = useUser()
    const { onOpen } = useLogin()

    if (!user.value) return onOpen()
})
