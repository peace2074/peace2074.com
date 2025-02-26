<script lang="ts" async setup>
import { VueScrollPicker } from 'vue-scroll-picker'
import "vue-scroll-picker/style.css";
import { useHead, useNuxtApp, useRoute } from '#imports';
import type revQuranT from '../../../server/api/quran'
import type { QDBI } from '../../../shared/types/index';
const nuxtApp = useNuxtApp()
const { $quran } = nuxtApp
export interface ONE_INTERFACE {
    id: number,
    name: string,
    e_name: string,
    type: string,
    total: number,
    ayat: {
        chapter: number
        verse: number
        text: string[]
    }[]
}

useHead({
    title: appName,
    appDescription: appDescription,
    ogTitle: appName,
    ogDescription: appDescription,
});
const route = useRoute()
const lok: Ref<number> = ref(route.params?.lok)
const router = useRouter()

watchEffect(() => {
    lok.value = +route.params?.lok as number && 1
})

// watch(
//     lok,
//     (newValue: number, oldValue: number) => {
//         if(!parseInt(oldValue)) {
//             lok.value = newValue
//         }
//     }
// );

const Quran: ONE_INTERFACE[] = nuxtApp.payload.data.B6H5jvHlMH
const sura: Ref<ONE_INTERFACE> = computed(() => Quran[lok.value - 1])
const Verses = computed(() => sura.value.ayat)
const options = Object.values(Quran).map((Single: ONE_INTERFACE) =>
({
    name: Single.name,
    value: Single.id
}))

</script>
<template>
    <q-page padding class="rtl">
        <div class="q-gutter-md" column>
            <q-card class="text-md">

                <q-card-section class="block pcs">
                    <VueScrollPicker :options="options" v-model="lok" />
                    <q-input mini v-model="lok" type="number" :max="114" :min="1" label="Sura" />

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
            </q-card>
            <q-card class="q-mt-xs">
                <q-card-section>
                    <h3>{{ AlFateha }}</h3>
                </q-card-section>
                <q-card-section>
                    <span class="capitalize block just fit verse">
                        <i class="q-mx-sm" v-for="aya in sura.ayat" :key="aya.verse">{{ aya.text }}
                            <q-chip class="text-white bg-green">{{ aya.verse }}</q-chip>
                        </i>
                    </span>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>
<style lang="scss">
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