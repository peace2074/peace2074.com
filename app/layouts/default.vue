<script lang="ts" setup>
const $q = useQuasar()
const offset = ref([0, 18])
const toggleLeftDrawer = ref(false)
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
// const locales = ref([
//   { code: 'en', language: 'en-US' },
//   { code: 'ar', language: 'ar-PL' },
// ])
const availableLocales = computed(() => {
  return locales.value.filter((i: { code: string }) => i.code !== locale.value)
})
const { toggle } = $q.dark
function toggleDark() {
  toggle()
  return $q.dark.mode
}
function toggleDrwer() {
  toggleLeftDrawer.value = !toggleLeftDrawer.value
}

</script>

<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleDrwer" />
        <q-toolbar-title>
          <nuxt-link :title="appName" to="/">{{ appName }}</nuxt-link>
        </q-toolbar-title>
        <q-btn dense flat round icon="light" @click="toggleDark" />
      </q-toolbar>
      <q-toolbar-title>
        <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
          {{ locale.name }}
        </NuxtLink>
      </q-toolbar-title>
    </q-header>

    <q-drawer min-width="150" mini v-model="toggleLeftDrawer" elevated side="left" bordered>
      <fahras />
    </q-drawer>

    <q-page-container>
      <slot />
      <q-page-scroller position="bottom" :scroll-offset="20" :offset="[0, 0]">
        <q-btn fab icon="keyboard_arrow_up" color="green" />
      </q-page-scroller>
    </q-page-container>

    <q-footer reveal>
      {{ appName }}
    </q-footer>

  </q-layout>
</template>

<style scoped></style>
