// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    // ssr: false,
    runtimeConfig: {
        githubClientId: process.env.GITHUB_CLIENT_ID,
        githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
        public: {
            cloudinaryCloudName: '',
            uploadPreset: '',
        },
    },
    app: {
        head: {
            script: [
                {
                    src: 'https://upload-widget.cloudinary.com/latest/global/all.js',
                    type: 'text/javascript',
                },
            ],
        },
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'shadcn-nuxt',
        'nuxt-icon',
        'nuxt3-leaflet',
    ],
    shadcn: {
        prefix: '',
        componentDir: './components/ui',
    },
})
