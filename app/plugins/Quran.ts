import { defineNuxtPlugin, useFetch, useState } from 'nuxt/app'

export default defineNuxtPlugin(async (nuxtApp: NuxtApp) => {
  if (import.meta.client) {
    const q2p = useQ2P()

    const { data } = await useFetch('/api/quran/', {
      headers: {
        Accept: 'application/json',
      },
      getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
      },
    })
    console.warn('status', status.value)

    if (data && data.value) {
      const readyData = data.value
      useState('Book', () => readyData)
      nuxtApp.provide('Book', readyData)
      q2p.setQuran(readyData)
    }
  }
})
