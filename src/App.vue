<script lang="ts" setup>

import { useResponsive } from '@/hooks'

/**
 * 响应式布局处理
 * @param {boolean} immediate - 是否立即执行
 */
useResponsive(true)

</script>

<template>
  <div
    class="h-300 p-t-100"
  >
    测试代码
  </div>

  <a-config-provider
    global
  >
    <RouterView />

    <!-- 页面配置  -->
    <GlobalSetting />

  </a-config-provider>
</template>
