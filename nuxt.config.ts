// https://nuxt.com/docs/api/configuration/nuxt-config
import { pwa } from './app/config/pwa'
// import { createResolver } from '@nuxt/kit'
import { appDescription } from './app/constants/index'

// const { resolve } = createResolver(import.meta.url)

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
    langDir: resolve('app/locale/index'),
    locales: [
      { code: 'en', language: 'en-US' },
      { code: 'ar', language: 'ar-IL' }
    ],
    defaultLocale: 'en',
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
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
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
      crawlLinks: false,
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