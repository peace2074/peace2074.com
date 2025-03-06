import { defineNuxtPlugin, useFetch, useNuxtApp, useState } from "nuxt/app";

export default defineNuxtPlugin(async (nuxtApp: NuxtApp) => {

  const { data } = await useFetch('/api/quran/', {
    headers: {
      Accept: 'application/json'
    },
    getCachedData(key) {
      return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    }
  })


  if (!!data && data.value) {
    useState('$quran', () => JSON.stringify(data.value.data))
    nuxtApp.provide('$quran', JSON.stringify(data.value.data))
  }

})
