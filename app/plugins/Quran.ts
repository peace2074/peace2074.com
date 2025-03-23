import { defineNuxtPlugin, useFetch, useState } from 'nuxt/app'

export default defineNuxtPlugin(async (nuxtApp: NuxtApp) => {
  const { data } = await useFetch('/api/quran/', {
    headers: {
      Accept: 'application/json',
    },
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    },
  })

  if (data && data.value) {
    const readyData = JSON.stringify(data.value.data)
    useState('quran', () => readyData)
    nuxtApp.provide('quran', readyData)
  }
})
