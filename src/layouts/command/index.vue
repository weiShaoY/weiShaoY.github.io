<script setup lang="ts">
import LayoutFooter from './LayoutFooter.vue'

import LayoutLoading from './LayoutLoading.vue'

import GlobalHeader from './modules/global-header/index.vue'

// type PropsType = {
//   loading: {
//     total: number // 全部
//     loaded: number // 已加载
//     isLoading: boolean // 执行状态
//   }
// }
// const props = defineProps<PropsType>()

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
        class="h-full rounded-3 bg-white p-10"
      >
        <RouterView />
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
