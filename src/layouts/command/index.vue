<script setup lang="ts">

import GlobalHeader from './modules/global-header/index.vue'

</script>

<template>
  <div
    class="relative h-screen bg-black"
  >

    <GlobalHeader />

    <div
      class="h-[calc(100%-80px)] w-full p-10"
    >
      <div
        class="h-full"
      >
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
