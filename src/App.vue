<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { isMobile } from '@/utils/isMobile'

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
// const isDev = import.meta.env.VITE_APP_NODE_ENV === 'development'

</script>

<template>
  <ElConfigProvider
    :locale="zhCn"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ElConfigProvider>

  <!-- <HomePageLoading
    v-if="!isDev"
  /> -->
</template>
