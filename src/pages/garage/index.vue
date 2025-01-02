<!------------------------------------  车库  ------------------------------------------------->
<script lang="ts" setup>
import ThreeContainer from './threeContainer/index.vue'

import UiContainer from './uiContainer/index.vue'
</script>

<template>
  <div
    class="relative h-screen"
  >
    <!-- UI界面层 -->
    <UiContainer />

    <!-- 3D场景层 -->
    <ThreeContainer />
  </div>
</template>

<style lang="less" scoped>

</style>
