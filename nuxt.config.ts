// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-02-20',
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss', '@nuxt/image'],  
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },
  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
    viewer: false,
    config: {
      darkMode: 'class',
      theme: {
        extend: {
          scale: {
            101: '1.01',
            102: '1.02',
          },
        },
      },
    },
  },
});