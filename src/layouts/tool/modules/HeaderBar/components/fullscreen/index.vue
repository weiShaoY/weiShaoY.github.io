<!------  2025-11-25---17:09---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

function toggleFullScreen() {
  toggleFullscreen()
}
</script>

<template>
  <BaseButton
    :tooltip-content="isFullscreen ? '退出全屏' : '进入全屏'"
    :icon="
      !isFullscreen
        ? 'admin-header-fullscreen'
        : 'admin-header-exit-fullscreen'
    "
    :icon-class="[
      'transition-all duration-300',
      {
        'hover:scale-110': !isFullscreen,
        'hover:scale-90': isFullscreen,
      },
    ]"
    @click="toggleFullScreen()"
  />
</template>

<style lang="scss" scoped>

</style>
