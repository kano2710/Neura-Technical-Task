// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt'
  ],
  typescript: {
    strict: true
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.BASE_URL
    }
  }
})
