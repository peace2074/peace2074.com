<script setup lang="ts">
import { definePageMeta, useOnline } from "#imports";
const { t } = useI18n()
const localePath = useLocalePath()

definePageMeta({
  layout: 'default',
  title: 'pages.quran'
})

const online = useOnline()
</script>

<template>
  <q-page padding>
    <Logos mb-6 />
    <ClientOnly>
      <Suspense>
        <PageView v-if="online" />
        <div v-else text-gray:80>
          You're offline
        </div>
        <template #fallback>
          <div italic op50>
            <span animate-pulse>Loading...</span>
            <q-skeleton animation="true" bordered />
          </div>
        </template>
      </Suspense>
      <template #fallback>
        <div op50>
          <span animate-pulse>...</span>
        </div>
      </template>
    </ClientOnly>
    <NuxtLink class="q-mt-xl text-h3 block" title="Quran" :to="'/quran/1'">{{ t('pages.quran') }}</NuxtLink>
    <NuxtLink class="q-mt-xl text-h3 block" title="HolyNames" to="/holynames">{{ $t('pages.holynames')}}</NuxtLink>

  </q-page>
</template>
