<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import Sun from '@/canvas/sun/index.vue'

// import Desktop from '@/canvas/desktop/index.vue'
import Test from '@/canvas/test/index.vue'

import Info from './components/info.vue'

import Intro from './components/intro.vue'

</script>

<template>
  <div
    class="relative h-full w-full"
  >

    <!-- 第一页 -->
    <div
      class="relative min-h-screen w-full"
    >

      <!-- 太阳 -->
      <div
        className="z-2 absolute right-0 top-20 !w-60  aspect-square sm:flex hidden "
      >
        <Sun />
      </div>

      <!-- 电脑桌模型 -->
      <div
        class="absolute z-1"
      >
        <!-- <Desktop /> -->
        <Test />

      </div>

      <!-- 个人介绍 -->
      <Intro />

    </div>

    <!-- 第二页 -->
    <div
      class="relative mx-auto max-w-7xl min-h-screen"
    >
      >
      <Info />
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
