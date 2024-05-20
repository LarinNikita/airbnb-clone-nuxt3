// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    runtimeConfig: {
        githubClientId: process.env.GITHUB_CLIENT_ID,
        githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    },

    modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', 'nuxt-icon'],
    //@ts-ignore
    shadcn: {
        prefix: '',
        componentDir: './components/ui',
    },
})
