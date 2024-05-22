import * as z from 'zod'

const LoginSchema = z.object({
    email: z.string().email({ message: 'Email is required' }),
    name: z.string().min(3, { message: 'Name is required' }),
    password: z.string().min(6, { message: 'Minimum 6 characters required' }),
})

const state = reactive({
    isOpen: false,
})

export default () => {
    const { isOpen } = toRefs(state)

    const onOpen = () => {
        state.isOpen = true
    }

    const onClose = () => {
        state.isOpen = false
    }

    return {
        isOpen,
        onOpen,
        onClose,
        LoginSchema,
    }
}
