
<script lang="ts" setup>
import type { ONE_INTERFACE } from "./quran/[...lok].vue"
const { t } = useI18n()
const nuxtApp = useNuxtApp()
const Quran: ONE_INTERFACE[] = nuxtApp.payload.data.B6H5jvHlMH
const CountOfAyat: Ref<number> = computed(() => {
    return Quran.map(s=>s.type)
})

</script>
<template>
    <q-page padding>
        <h1>{{ t('pages.miracles.pageTitle') }}</h1>
        <q-cart>
            <q-card-section>
                {{ CountOfAyat }}
            </q-card-section>
            
        </q-cart>
    </q-page>
</template>