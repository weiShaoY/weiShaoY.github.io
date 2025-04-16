<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import { useTestStore } from '@/store'

import GlobalContent from './modules/global-content/index.vue'

import GlobalHeader from './modules/global-header/index.vue'

import GlobalMenu from './modules/global-menu/index.vue'

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
    <GlobalHeader />

    <GlobalMenu />

    <GlobalContent />
  </div>
</template>

<style lang="scss">

</style>
