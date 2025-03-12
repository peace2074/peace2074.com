<script lang="ts" setup>
import type { LocalesT, LocaleT } from '~~/i18n.config'
import { computed, ref, useI18n, useQuasar } from '#imports'

const $q = useQuasar()
const offset = ref([0, 18])
const toggleLeftDrawer = ref(false)
let { locale, availableLocales } = useI18n() as {
  locale: LocaleT
  availableLocales: LocalesT
}
const switchLocalePath = useSwitchLocalePath()

const filteredLocales = computed(() => {
  return availableLocales.filter((i: { code: string }) => i.code !== locale.code)
})

const { toggle } = $q.dark
function toggleDark() {
  toggle()
  return $q.dark.mode
}
function toggleLang() {
  switchLocalePath(locale.code)
}

function toggleDrawer() {
  toggleLeftDrawer.value = !toggleLeftDrawer.value
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-green-9 text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleDrawer" />
        <q-toolbar-title>
          <nuxt-link :title="appName" to="/">
            {{ appName }}
          </nuxt-link>
        </q-toolbar-title>
        <q-btn dense flat round icon="light" @click="toggleDark" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="toggleLeftDrawer"
      min-width="150"
      mini
      elevated
      side="left"
      bordered
    >
      <fahras />
    </q-drawer>

    <q-page-container>
      <slot />
      <q-page-scroller position="bottom" :scroll-offset="20" :offset="[0, 0]">
        <q-btn fab icon="keyboard_arrow_up" color="green" />
      </q-page-scroller>
    </q-page-container>

    <q-footer reveal class="bg-green-9">
      <q-toolbar class="bg-green-4 text-white">
        <q-btn flat round dense icon="assignment_ind" />
        <q-toolbar-title>
          <nuxt-link :title="appName" to="/" />
        </q-toolbar-title>
        <q-btn flat round dense icon="apps" class="q-mr-xs" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style scoped></style>
