<script lang="ts" async setup>
// import type { QDBI } from '../../../shared/types/index'
// import revQuranT from '../../../server/api/quran'
import { definePageMeta, useHead, useI18n, useNuxtApp, useRoute, watch } from '#imports'
import { VueScrollPicker } from 'vue-scroll-picker'
import 'vue-scroll-picker/style.css'

const nuxtApp = useNuxtApp()

export interface AYAT {
  chapter: number
  verse: number
  text: string[]
}
export interface ONE_INTERFACE {
  [k: string]: number | string | AYAT[]
  id: number
  name: string
  e_name: string
  type: string
  total: number
  ayat: AYAT[]
}
const { t } = useI18n()

const route = useRoute()
const lok: Ref<number> = ref(1)
const bookmarks: Ref<string[]> = ref([])
// const anchor = ref('')
const router = useRouter({
  scrollBehavior(to: any, _from: string) {
    if (to.hash) {
      return { el: to.hash }
    }
  },
})
const Quran: ONE_INTERFACE[] = nuxtApp.payload.data['TbCCBUHxHmfsW9be2MugfVkp6cghANor-sXUufOWNbQ']
const sura: Ref<ONE_INTERFACE> = computed(() => Quran[lok.value - 1])
// const Verses = computed(() => sura.value.ayat)
const options = Object.values(Quran).map((Single: ONE_INTERFACE) =>
  ({
    name: `${Single.id}-${Single.name}`,
    value: Single.id,
  }))

watchEffect(() => {
  lok.value = route.params.lok
})
function saveBookmark(bm: number) {
  bookmarks.value.push(`${lok.value}:${bm}`)
}
function navToHash(hash: string) {
  router.go(hash)
}

watch(
  lok,
  (current: number) => {
    router.replace({ params: { lok: current } })
  },
)
const PageName: Ref<string> = computed(() => sura.value.name as string)

useHead({
  title: `${appName}-${PageName.value}`,
  appDescription,
  ogTitle: appName,
  ogDescription: appDescription,
})
</script>

<template>
  <q-page padding class="rtl">
    <div class="q-gutter-md" column>
      <q-card class="text-md">
        <q-card-section class="pcs block">
          <VueScrollPicker v-model="lok" :options="options" />
          <q-input v-model="lok" fab mini type="number" :max="114" :min="1" label="Sura" />
        </q-card-section>

        <q-card-section class="rtl flex">
          <div>
            <h4 class="text-h3">
              <span class="text-h6">{{ t('pages.quran.sura.name') }}</span>{{ sura.name }}
            </h4>
            <h5 class="text-h5">
              <span class="text-h6">{{ t('pages.quran.sura.id') }}</span>:{{ sura.id }}
            </h5>
          </div>
          <div>
            <h4 class="align-left text-h6">
              {{ t('pages.quran.sura.totverses') }}:{{ sura.total_verses }}
            </h4>
            <h4 class="align-left text-h6">
              {{ t('pages.quran.sura.location') }}:{{ sura.type }}
            </h4>
          </div>
        </q-card-section>
        <q-card-section>
          {{ t('pages.quran.sura.bookmark') }}
          <ol>
            <li v-for="b in bookmarks" :key="b" @click="navToHash(b)">
              {{ b }}
            </li>
          </ol>
        </q-card-section>
      </q-card>
      <q-card class="q-mt-xs">
        <q-card-section>
          <h3>{{ AlFateha }}</h3>
        </q-card-section>
        <q-card-section>
          <span class="just fit verse block capitalize">
            <i v-for="aya in sura.ayat" :key="aya.verse" class="q-mx-sm" :hash="aya.verse">{{ aya.text }}
              <q-chip class="bg-green text-white">{{ aya.verse }}</q-chip>
              <q-btn
                dense fab-mini color="yellow" size="10" icon="bookmark"
                @click="saveBookmark(aya.verse)"
              />
            </i>
          </span>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style lang="scss">
@import 'vue-scroll-picker/style.css';

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
