<!------  2025-11-23---03:12---星期天  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useFullscreen, useWindowSize } from '@vueuse/core'

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

/**
 * 切换全屏状态
 */
function toggleFullScreen(): void {
  toggleFullscreen()
}

</script>

<template>
  <div
    class=""
  >
    1111
  </div>
</template>

<style lang="scss" scoped>

</style>
