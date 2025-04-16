<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import { useTestStore } from '@/store'

import Menu from './modules/menu/index.vue'

import PageContent from './modules/pageContent/index.vue'

const testStore = useTestStore()

const layoutStyle = computed(() => ({
  paddingLeft: `calc(${testStore.setting.menu.leftMenuWidth}px + ${testStore.setting.menu.rightMenuWidth}px)`,
  paddingTop: `122px`,
}))

</script>

<template>
  <div
    class="h-full min-h-[100vh] w-full overflow-hidden bg-[#F7FAFC] transition-all duration-300"
    :style="layoutStyle"
  >
    <Menu />

    <PageContent />
  </div>
</template>

<style lang="scss">

</style>
