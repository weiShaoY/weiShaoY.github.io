<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

// import { HomeApi } from '@/api'

import Experience from './components/experience/index.vue'

import Project from './components/project/index.vue'

onMounted(async () => {
  // const aaa = await HomeApi.test()

  // console.log('%c Line:7 🍣 aaa', 'color:#42b983', aaa)
})
</script>

<template>
  <div
    class="relative mx-auto h-full max-w-7xl w-full pt-20"
  >
    <Project />

    <Experience />
  </div>
</template>

<style lang="scss" scoped>

</style>
