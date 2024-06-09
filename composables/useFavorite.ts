import type { User } from '@prisma/client'
import { useToast } from '~/components/ui/toast'

interface FavoriteProps {
    listingId: string
}

export const useFavorite = async ({ listingId }: FavoriteProps) => {
    const { onOpen } = useLogin()
    const { toast } = useToast()

    const {
        data: loggedInUser,
        error,
        refresh,
    } = await useFetch<User>('/api/loggedin')

    const isFavorite = computed(() => {
        const list = loggedInUser.value?.favoriteIds || []
        return list.includes(listingId)
    })

    const toggleFavorite = async (e: MouseEvent) => {
        e.stopPropagation()

        return new Promise(async (resolve, reject) => {
            if (!loggedInUser.value) {
                return onOpen()
            }

            const { error } = await useFetch(`/api/favorites/${listingId}`, {
                method: 'post',
            })

            if (!error.value) {
                refresh()
                return await refreshNuxtData(['listings', 'favorites'])
            }

            return toast({
                title: error.value.statusMessage,
                variant: 'destructive',
                duration: 1000,
            })
        })
    }

    return { isFavorite, toggleFavorite }
}
