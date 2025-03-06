// https://nuxt.com/docs/api/configuration/nuxt-config
import { pwa } from './app/config/pwa'
import { appDescription } from './app/constants/index'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    'nuxt-quasar-ui',
    '@nuxtjs/i18n',
  ],
  i18n: {
    baseUrl: 'https://peace2074.com/',
    defaultLocale: 'ar',
    vueI18nLoader: true,
    vueI18n: './i18n.config.ts'
  },
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/quasar@2.17.7/dist/quasar.prod.css' }
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/app.scss',
  ],
  colorMode: {
    classSuffix: '',
  },

  future: {
    compatibilityVersion: 4,
  },
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    typedPages: true,
  },
  nitro: {
    rollupConfig: {
      external: ['resolve'],
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks:true,
      routes: ['/'],
      ignore: ['/hi'],
    },
    imports: {
      autoImport: true,
      dirs: [
        '../shared',
        '../app/constants',
        '../app/components'
      ]
    }

  },
  imports: {
    autoImport: true,
    dirs: [
      '../app/constants',
      '../app/layouts',
      '../app/store',
      '../app/composables',
      '../app/components',
      '../shared',
      '../server/uils'
    ]
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: {
        sortConfigKeys: true,
      },
    },
  },

  pwa,
  compatibilityDate: "2025-03-05"
})