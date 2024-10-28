<script setup lang="ts">

import { useAppStore } from '@/store'

const appStore = useAppStore()

</script>

<template>
  <TheHeader />

  <div
    class="w-ful h-full flex flex-col justify-between overflow-auto"
    :style="{
      paddingTop: `${appStore.app.home.headerHeight}px`,
    }"
  >
    <RouterView />

    <TheFooter />
  </div>
</template>
