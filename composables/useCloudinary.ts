const { onClose, onOpen } = useRentModal()

const imageUrl = ref('')

export function useCloudinary() {
    const config = useRuntimeConfig()

    function createWidget() {
        //@ts-ignore
        const myWidget = cloudinary.createUploadWidget(
            {
                cloudName: config.public.cloudinaryCloudName,
                uploadPreset: config.public.uploadPreset,
                multiple: false,
                maxFiles: 1,
            },
            (error: any, result: any) => {
                if (!error && result && result.event === 'success') {
                    imageUrl.value = result?.info.secure_url
                } else {
                    if (result.info === 'shown') {
                        onClose()
                    }
                    if (result.info === 'hidden') {
                        onOpen()
                    }

                    return null
                }
            },
        )

        return myWidget
    }

    function openWidget() {
        const widget = createWidget()
        widget.open()
    }

    return {
        imageUrl,
        openWidget,
    }
}
