<script setup lang="ts" name="layout">

// import type { LayoutType } from '@/stores/interface'

import type { Component } from 'vue'

import { useTestStore } from '@/store/modules/test'

import {

  computed,
  reactive,
  watch,
} from 'vue'

import ThemeDrawer from './components/ThemeDrawer/index.vue'

import LayoutClassic from './LayoutClassic/index.vue'

import LayoutColumns from './LayoutColumns/index.vue'

import LayoutTransverse from './LayoutTransverse/index.vue'

import LayoutVertical from './LayoutVertical/index.vue'

const LayoutComponents: Record<BlogType.LayoutType, Component> = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns,
}

const testStore = useTestStore()

const isDark = computed(() => testStore.global.isDark)

const layout = computed(() => testStore.global.layout)

const watermark = computed(() => testStore.global.watermark)

const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
})

watch(isDark, () => (font.color = isDark.value ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)'), {
  immediate: true,
})
</script>

<template>
  <el-watermark
    id="watermark"
    :font="font"
    :content="watermark ? ['Geeker Admin', 'Happy Working'] : ''"
  >
    <component
      :is="LayoutComponents[layout]"
    />

    <ThemeDrawer />
  </el-watermark>
</template>

<style scoped lang="scss">
.layout {
  min-width: 600px;
}
</style>
