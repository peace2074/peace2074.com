<script lang="ts" setup>
import { ref, useQuasar } from '#imports'

const $q = useQuasar()
const { t } = useI18n()

const toggleLeftDrawer = ref(false)

const { toggle } = $q.dark
function toggleDark() {
  toggle()
  return $q.dark.mode
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
          <nuxt-link :title="t('general.SiteTitle')" to="/">
            {{ t('general.SiteTitle') }}
          </nuxt-link>

          <q-space />
        </q-toolbar-title>
        <q-btn
          color="lemon-9"
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          @click="$q.fullscreen.toggle()"
        />
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
