<script lang="ts" setup>

// import { useResponsive } from '@/hooks'

/**
 * 响应式布局处理
 * @param {boolean} immediate - 是否立即执行
 */
// useResponsive(true)

import { useHead } from '@/hooks'

useHead('Vue-实现')

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
