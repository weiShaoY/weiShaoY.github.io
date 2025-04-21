<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import { useBlogStore } from '@/store'

import GlobalContent from './modules/global-content/index.vue'

import GlobalHeader from './modules/global-header/index.vue'

import GlobalMenu from './modules/global-menu/index.vue'

import GlobalSearch from './modules/global-search/index.vue'

import GlobalTab from './modules/global-tab/index.vue'

const blogStore = useBlogStore()

const layoutStyle = computed(() => ({
  paddingLeft: `calc(${blogStore.setting.menu.leftMenuWidth}px + ${blogStore.setting.menu.rightMenuWidth}px)`,
  paddingTop: `122px`,
}))

</script>

<template>
  <div
    class="h-full min-h-[100vh] w-full overflow-hidden bg-[#F7FAFC] transition-all duration-300"
    :style="layoutStyle"
  >

    <GlobalHeader />

    <GlobalTab />

    <GlobalMenu />

    <GlobalContent />

    <GlobalSearch />
  </div>
</template>

<style lang="scss">

</style>
