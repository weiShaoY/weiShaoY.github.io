<script setup lang="ts">
import { useTestStore } from '@/store'

import DarkMode from './modules/dark-mode.vue'

import LayoutMode from './modules/layout-mode.vue'

import PageFun from './modules/page-fun.vue'

import ThemeColor from './modules/theme-color.vue'

defineOptions({
  name: 'ThemeDrawer',
})

const testStore = useTestStore()
</script>

<template>
  <ElDrawer
    v-model="testStore.app.themeDrawerVisible"
    title="主题配置"
    :size="360"
  >
    <DarkMode />

    <LayoutMode />

    <ThemeColor />

    <PageFun />

    <template
      #footer
    />
  </ElDrawer>
</template>

<style scoped></style>
