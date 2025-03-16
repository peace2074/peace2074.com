<script lang="ts" setup>

</script>

<template>
  <q-page padding>
    <q-menu>
      <q-list style="min-width: 100px">
        <q-item v-close-popup clickable>
          <q-item-section>New tab</q-item-section>
        </q-item>
        <q-separator />
        <q-item v-close-popup clickable>
          <q-item-section>New incognito tab</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    HI
    <slot />
  </q-page>
</template>
