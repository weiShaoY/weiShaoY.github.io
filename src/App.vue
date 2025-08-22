<script lang="ts" setup>

import zhCn from 'element-plus/es/locale/lang/zh-cn'

/**
 * 组件名称
 */
defineOptions({
  name: 'App',
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
</template>
