// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["./app/assets/css/tailwind.css"],
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    'shadcn-nuxt',
    '@nuxthub/core',
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    'nitro-cloudflare-dev',
    'nuxt-authorization',
  ],
shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  hub: {
    bindings:{
      compatibilityFlags: ["nodejs_compat"]
    },
    blob: true,
    database: true
  },
auth: {
  isEnabled: false,
    provider: {
      type: 'authjs',
      trustHost: false,
      addDefaultCallbackUrl: true,
      defaultProvider: 'auth0'
    },
    origin: '/api/auth',
    baseURL: process.env.AUTH_ORIGIN,
  },
  
   icon: {
    customCollections: [
      {
        prefix: 'jj',
        dir: './app/assets/jj',
        recursive: true
      },
    ],
  },
   app: {
    head: {
      title: 'JuegoJalea',
      htmlAttrs: {
        lang: 'es',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
})
