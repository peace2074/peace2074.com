<script lang="ts" setup>
type ONET = {
    Index: number | string,
    name: string,
    Location: string,
    TotalVerses: number,
    Verses: string[],
}
const nuxtApp = useNuxtApp()
const Quran: ONET[] = nuxtApp.payload.data.B6H5jvHlMH as ONET[]
const names = ref(Quran).value.map(v => ({ names: v.name }))
const router = useRouter()

function navToLok(lok: number) {
    const advonced = lok + 1 || 1
    router.push(`/quran/${advonced}`)
}
</script>
<template>
    <ol class="column q-mt-xl q-pt-lg">
        <nuxt-link class="cursor-pointer" v-for="(i, ind) in names" :key="i.names"
            @click="navToLok(ind)">{{ ind + 1 }}-{{ i.names }}
        </nuxt-link>
    </ol>
</template>