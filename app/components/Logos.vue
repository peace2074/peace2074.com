<script lang="ts" setup>
const imgSrc = ref("/nuxt.svg")
</script>
<template>
  <div flex cursor-default text-3xl font-300>
    <div flex class="q-mx-auto q-pa-md">
      <q-img h-18 w-18 mx-auto class="q-mx-auto" :src="imgSrc" alt="Nuxt 4" />
      <span mt--2 mx-auto text-green5 class=" text-h4 block q-mx-auto">Nuxt 4</span>
    </div>
  </div>
</template>
<style scoped>
.mx-auto{
  margin: 0 auto;
}
</style>