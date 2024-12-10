<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import Desktop from '@/canvas/desktop/index.vue'

import Info from './components/info.vue'

</script>

<template>
  <div
    class="h-full"
  >
    <div
      class="h-screen"
    >
      <Desktop />

    </div>

    <div
      class="mx-auto h-screen max-w-7xl"
    >
      <Info />
    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
