<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import Experience from './components/experience/index.vue'

import Project from './components/project/index.vue'

</script>

<template>
  <div
    class="relative mx-auto h-full max-w-7xl w-full flex flex-col gap-20 px-10 py-40 max-sm:px-5"
  >
    <!-- 作品 -->
    <Project />

    <!-- 经历 -->
    <Experience />
  </div>
</template>

<style lang="scss" scoped>

</style>
