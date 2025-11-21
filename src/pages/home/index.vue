<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import Sun from '@/canvas/sun/index.vue'

// import Desktop from '@/canvas/desktop/index.vue'

import Test from '@/canvas/test/index.vue'

import { isMobile } from '@/utils'

import Info from './components/info.vue'

import Intro from './components/intro.vue'

</script>

<template>
  <div
    class="relative"
  >

    <!-- 第一页 -->
    <div
      class="relative w-full"
      :class=" isMobile ? 'h-70' : 'min-h-screen'"
    >

      <!-- 太阳 -->
      <div
        class="absolute right-0 top-20 z-2 hidden aspect-square !w-60 sm:flex"
      >
        <Sun />
      </div>

      <!-- 电脑桌模型 移动端不显示 -->
      <div
        v-if="!isMobile"
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
      class="relative mx-auto max-w-7xl min-h-screen px-10 py-20 max-sm:px-5"
    >
      <Info />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
