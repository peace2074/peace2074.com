<script lang="ts" setup>
const nuxtApp = useNuxtApp()
interface HolyNameI {
    name: string,
    text: string
}
const { $HolyNames } = nuxtApp
const holynames: HolyNameI[] = $HolyNames as HolyNameI[]

</script>
<template>
    <QPage padding class="holynames-page fit rtl">
        <Glory class="glory" v-for="one in holynames" :name="one
            .name" :text="one.text" :key="one.text">{{ one.name }}</Glory>
    </QPage>
</template>

<style lang="scss" scoped>
.glory {
    font: calc(4rem + 100vw);
}

</style>