<script lang="ts" setup>
import type { ONE_INTERFACE } from './quran/[...lok].vue'

const { t } = useI18n()
// const uique = []
const nuxtApp = useNuxtApp()
const quran: ONE_INTERFACE[] = nuxtApp.payload.data['TbCCBUHxHmfsW9be2MugfVkp6cghANor-sXUufOWNbQ']
const CountOfAyat = quran.map((one: ONE_INTERFACE) => ({
  id: one.id,
  text: one.ayat.map(t => (
    {
      aya: `${one.id}:${t.verse}-${t.text}`,
    })),
}))
</script>

<template>
  <q-page padding class="fit flex">
    <h1>{{ t('pages.miracles.pageTitle') }}</h1>
    <q-cart>
      <q-card-section>
        <!-- <pre>{{ CountOfAyat }}</pre> -->
        <pre>{{ CountOfAyat }}</pre>
      </q-card-section>
    </q-cart>
  </q-page>
</template>
