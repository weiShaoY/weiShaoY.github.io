<!------------------------------------  车库  ------------------------------------------------->
<script lang="ts" setup>
import { useGarageStore } from '@/store'

import ThreeContainer from './threeContainer/index.vue'

import UiContainer from './uiContainer/index.vue'

const garageStore = useGarageStore()

garageStore.init()

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
