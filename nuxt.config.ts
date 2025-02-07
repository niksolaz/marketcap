// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: process.env.NUXT_API_KEY,
    // Keys within public are also exposed client-side
    public: {
      baseUrl: process.env.NUXT_BASE_URL
    }
  },
  plugins: [
    '~/plugins/useMarketCapPlugin.js'
  ],
  imports: {
    dirs: ['composables/*.{ts,js}']
  },
  nitro: {
    output: {
      server: '.output/server'
    },
    preset: 'vercel'
    /*
    routeRules: {
      '/': { swr: 3600, appMiddleware: 'geo' },
      // Add other routes if needed
    }
    */
  },
  
  build: {
    transpile: []
  }
})
