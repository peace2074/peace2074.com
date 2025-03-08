<script lang="ts" setup>
import type { ONE_INTERFACE } from "./quran/[...lok].vue"
const { t } = useI18n()
const nuxtApp = useNuxtApp()
const Quran: ONE_INTERFACE[] = nuxtApp.payload.data.B6H5jvHlMH
const CountOfAyat = Quran.map(one => ({
    id: one.id,
    total: one.total,
    chapter: one
}))

</script>
<template>
    <q-page padding class="fit flex">
        <h1>{{ t('pages.miracles.pageTitle') }}</h1>
        <q-cart>
            <q-card-section>
                <pre>{{ CountOfAyat }}</pre>
            </q-card-section>

        </q-cart>
    </q-page>
</template>