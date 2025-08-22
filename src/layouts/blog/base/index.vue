<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import { useBlogStore } from '@/stores'

import GlobalContent from './modules/global-content/index.vue'

import GlobalHeader from './modules/global-header/index.vue'

import GlobalMenu from './modules/global-menu/index.vue'

import GlobalSearch from './modules/global-search/index.vue'

import GlobalTab from './modules/global-tab/index.vue'

import GlobalWatermark from './modules/global-watermark/index.vue'

const blogStore = useBlogStore()

const layoutStyle = computed(() => ({
  paddingLeft: `calc(${blogStore.setting.menu.leftMenuWidth}px + ${blogStore.setting.menu.rightMenuWidth}px)`,
  paddingTop: `122px`,
}))

</script>

<template>
  <div
    class="h-full min-h-[100vh] w-full bg-[#F7FAFC] transition-all duration-300"
    :style="layoutStyle"
  >

    <!-- 全局头部 -->
    <GlobalHeader />

    <!-- 全局标签 -->
    <GlobalTab />

    <!-- 双列菜单 -->
    <GlobalMenu />

    <!-- 全局内容 -->
    <GlobalContent />

    <!-- 全局搜索 -->
    <GlobalSearch />

    <!-- 水印效果 -->
    <GlobalWatermark />
  </div>
</template>

<style lang="scss">

</style>
