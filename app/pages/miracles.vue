<script lang="ts" setup>
import type { ONE_INTERFACE } from './quran/[...lok].vue'

const { $Book } =  useNuxtApp()
const quran: ONE_INTERFACE[] = $Book
const { t } = useI18n()
const CountOfAyat = quran.map((one: ONE_INTERFACE) => ({
  id: one,
  ayat: one.ayat.map(t => (
    {
      [`${one.id}:${t.verse}`]: t.text.split(' ').map((a, i) => ({ word: `${i + 1}-${a}` })),

    }),
  ),
}))
</script>

<template>
  <ClientOnly>
    <Suspense>
      <q-page v-if="!!quran" padding class="fit flex bg-white">
        <h1>{{ t('pages.miracles.pageTitle') }}</h1>
        <q-cart>
          <q-card-section>
            <pre>{{ CountOfAyat }}</pre>
          </q-card-section>
        </q-cart>
      </q-page>
      <q-Skeleton v-else class="fit" />
    </Suspense>
  </ClientOnly>
</template>
