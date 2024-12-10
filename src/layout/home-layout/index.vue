<!------------------------------------  首页模块  ------------------------------------------------->
<script lang="ts" setup>

import Navbar from './components/navbar/index.vue'

</script>

<template>
  <a-layout
    class="relative h-[100vh] w-full bg-[#212224]"
  >
    <!-- 顶部导航栏 -->
    <Navbar />

    <RouterView />

  </a-layout>
</template>

<style lang="less" scoped>

</style>
