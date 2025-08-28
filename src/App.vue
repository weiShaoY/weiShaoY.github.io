<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { homeMittBus, isMobile } from '@/utils'

/**
 * 组件名称
 */
defineOptions({
  name: 'App',
})

watchEffect(() => {
  console.log('%c Line:17 🍣 isMobile.value', 'color:#e41a6a', isMobile.value)
})

/**
 *  是否为开发环境
 */
const isDev = false

onMounted(() => {
  homeMittBus.emit('startLoading', 3)
})
</script>

<template>
  <ElConfigProvider
    :locale="zhCn"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ElConfigProvider>

  <HomePageLoading
    v-if="!isDev"
  />
</template>
