<script lang="ts" async setup>
const nuxtApp = useNuxtApp()
import { VueScrollPicker } from 'vue-scroll-picker'
import "vue-scroll-picker/style.css";
import { useHead, useNuxtApp, useRoute,watch } from '#imports';
import revQuranT from '../../../server/api/quran'
import type { QDBI } from '../../../shared/types/index';
const { $quran } = nuxtApp
type AYAT = {
    chapter: number;
    verse: number;
    text: string[];
}
export interface ONE_INTERFACE {
    [k: string]: number | string | AYAT[]
    id: number,
    name: string,
    e_name: string,
    type: string,
    total: number,
    ayat: AYAT[]
}

useHead({
    title: appName,
    appDescription: appDescription,
    ogTitle: appName,
    ogDescription: appDescription,
});
const route = useRoute()
const routeParams = computed(()=>route.params.lok)
let lok: Ref<number> = ref(1)
const bookmarks:Ref<string[]> = ref([])
const anchor = ref('')
const router = useRouter({
    scrollBehavior(to: any, from: string) {
        if (to.hash) {
            return { el: to.hash }
        }
    },
})
const Quran: ONE_INTERFACE[] = nuxtApp.payload.data.B6H5jvHlMH
const sura: Ref<ONE_INTERFACE> = computed(() => Quran[lok.value - 1])
const Verses = computed(() => sura.value.ayat)
const options = Object.values(Quran).map((Single: ONE_INTERFACE) =>
({
    name: Single.id+'-'+Single.name,
    value: Single.id
}))
watchEffect(() => {
    lok.value = route.params.lok
})
const saveBookmark = (bm:number) => {
    bookmarks.value.push(lok.value+':'+bm)
}
const navToHash = (hash:string) => {
    router.go(hash)
}
watch(
    lok,
    (current: number) => {
        router.replace(`/quran/${current}`)
    }
)
</script>
<template>
    <q-page padding class="rtl">
        <div class="q-gutter-md" column>
            <q-card class="text-md">

                <q-card-section class="block pcs">
                    <VueScrollPicker :options="options" v-model="lok" />
                    <q-input fab mini v-model="lok" type="number" :max="114" :min="1" label="Sura" />

                </q-card-section>

                <q-card-section class="rtl flex">
                    <div>
                        <h4 class="text-h3"><span class="text-h6">اسم السورة</span>{{ sura.name }}</h4>
                        <h5 class="text-h5"><span class="text-h6">رقم</span>:{{ sura.id }}</h5>
                    </div>
                    <div>
                        <h4 class="capitalize align-left text-h6">Number of Verses:{{ sura.total_verses }}</h4>
                        <h4 class="capitalize align-left text-h6">Location:{{ sura.type }}</h4>
                    </div>
                </q-card-section>
                <q-card-section>
                    bookmarks
                    <ol>
                        <li v-for="b in bookmarks" :key="b" @click="navToHash(b)">{{ b }}</li>
                    </ol>
                </q-card-section>
            </q-card>
            <q-card class="q-mt-xs">
                <q-card-section>
                    <h3>{{ AlFateha }}</h3>
                </q-card-section>
                <q-card-section>
                    <span class="capitalize block just fit verse">
                        <i class="q-mx-sm" v-for="aya in sura.ayat" :key="aya.verse" :hash="aya.verse">{{ aya.text }}
                            <q-chip class="text-white bg-green">{{ aya.verse }}</q-chip>
                            <q-btn dense fab-mini color="yellow" size="10" icon="bookmark" @click="saveBookmark(aya.verse)" />
                        </i>
                    </span>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>
<style lang="scss">
@import "vue-scroll-picker/style.css";

.just {
    text-align: justify;
    letter-spacing: 1px;
    font-size: larger;
}

.capitalize::first-letter {
    text-transform: uppercase;
}

.rtl {
    direction: rtl;
}

.ltr {
    direction: ltr;
}

.pcs {
    overflow-x: scroll;
    overflow-y: hidden;
}

.flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: nowrap;
}

// .verse::after {
//     content: '♦';
// }

.verse {
    font-size: 2rem;
}

.align-left {
    text-align: left;
}

.align-right {
    text-align: right;
}
</style>