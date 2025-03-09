<script lang="ts" setup>
import { useTitle } from '@vueuse/core'

const isDevelopment = import.meta.env.VITE_APP_NODE_ENV

useTitle(isDevelopment ? 'Vue-实现' : '代码改变世界')

console.info(
  '%cNiceToMeetYou,我是weiShaoY',
  'color: orange;background:	ivory;font-size:26px;border: 2px solid black;padding:10px;text-shadow:1px 1px grey;border-radius:11px;',
)
</script>

<template>
  <a-config-provider
    global
  >
    <RouterView />

    <!-- 页面配置  -->
    <GlobalSetting />
  </a-config-provider>
</template>
