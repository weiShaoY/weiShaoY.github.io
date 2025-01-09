<!------------------------------------  车库  ------------------------------------------------->
<script lang="ts" setup>
import ThreeContainer from './threeContainer/index.vue'

import UiContainer from './uiContainer/index.vue'

</script>

<template>
  <div
    class="relative h-screen"
  >
    <!-- 3D场景层 -->
    <ThreeContainer />

    <!-- UI界面层 -->
    <UiContainer />

  </div>
</template>

<style lang="less" scoped>

</style>
