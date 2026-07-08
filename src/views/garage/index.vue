<!------------------------------------  车库  ------------------------------------------------->
<script lang="ts" setup>

import { isMobile } from '@/utils'

import ThreeContainer from './threeContainer/index.vue'

import UiContainer from './uiContainer/index.vue'
</script>

<template>
  <div
    :class="isMobile ? 'aaa relative h-screen' : 'relative h-screen'"
  >
    <!-- UI界面层 -->
    <UiContainer />

    <!-- 3D场景层 -->
    <ThreeContainer />

    <!-- 回到首页按钮 -->
    <BackHomeButton />
  </div>
</template>

<style lang="scss" scoped>
.aaa {
  width: 100vh;
  height: 100vw;
  transform-origin: top left;
  transform: rotate(90deg) translateY(-100%);
}
</style>
