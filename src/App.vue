<script lang="ts" setup>
import type { WatermarkProps } from 'element-plus'

import { useTitle } from '@vueuse/core'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { computed } from 'vue'

import { useBlogStore } from './store'

defineOptions({
  name: 'App',
})

const isDevelopment = import.meta.env.VITE_APP_NODE_ENV

useTitle(isDevelopment ? 'Vue-实现' : '代码改变世界')

// console.info(
//   '%cNiceToMeetYou,我是weiShaoY',
//   'color: orange;background:ivory;font-size:26px;border: 2px solid black;padding:10px;text-shadow:1px 1px grey;border-radius:11px;',
// )

const blogStore = useBlogStore()

const watermarkProps = computed<WatermarkProps>(() => {
  return {
    content: blogStore.setting.watermark.isShow ? blogStore.setting.watermark.text : '',
    cross: true,
    fontSize: 16,
    lineHeight: 16,
    gap: [100, 120],
    rotate: -15,
    zIndex: 9999,
  }
})

</script>

<template>
  <ElConfigProvider
    :locale="zhCn"
  >
    <AppProvider>
      <ElWatermark
        class="h-full"
        v-bind="watermarkProps"
      >
        <RouterView
          class="bg-layout"
        />
      </ElWatermark>
    </AppProvider>
  </ElConfigProvider>
</template>
