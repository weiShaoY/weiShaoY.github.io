<!------------------------------------  首页模块  ------------------------------------------------->
<script lang="ts" setup>
import { useHomeStore } from '@/store'

import Footer from './components/footer/index.vue'

const homeStore = useHomeStore()
</script>

<template>
  <TheHeader />

  <div
    class="w-ful h-full flex flex-col justify-between overflow-auto"
    :style="{
      paddingTop: `${homeStore.state.navbar.height}px`,
    }"
  >
    <RouterView />

  </div>

  <Footer />

</template>

<style lang="less" scoped>

</style>
