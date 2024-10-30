<!------------------------------------  首页模块  ------------------------------------------------->
<script lang="ts" setup>
import { useHomeStore } from '@/store'

import Footer from './components/footer/index.vue'

import Navbar from './components/navbar/index.vue'

const homeStore = useHomeStore()
</script>

<template>

  <a-layout
    class="h-full w-full"
  >
    <!-- 顶部导航栏 -->
    <div
      v-if="homeStore.state.navbar.visible"
      class="fixed left-0 top-0 z-100 w-full"
      :style="{
        height: `${homeStore.state.navbar.height}px`,
      }"
    >
      <Navbar />
    </div>

    <a-layout
      class="min-h-100vh overflow-y-auto duration-500 ease-in-out"
      :style="{
        paddingTop: `${homeStore.state.navbar.visible ? `${homeStore.state.navbar.height}px` : '0'}`,
      }"
    >

      <RouterView />

      <!-- 底部 -->
      <Footer />

    </a-layout>

  </a-layout>

</template>

<style lang="less" scoped>

</style>
