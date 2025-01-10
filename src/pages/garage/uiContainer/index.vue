<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import { useGarageStore } from '@/store'

import Bar from './components/bar/index.vue'

import Loading from './components/loading/index.vue'

const garageStore = useGarageStore()

watchEffect(() => {
  console.log('%c Line:13 🍑 garageStore.ui.loading.status', 'color:#ed9ec7', garageStore.ui.loading.status)
})

// 音频播放逻辑监听
watch(() => garageStore.interact.audioAllowed, (newVal) => {
  if (newVal) {
    // TODO: 播放音乐
  }
})

</script>

<template>

  <div>
    <Loading
      v-if=" garageStore.ui.loading.status "
    />

    <Bar
      v-else
    />

  </div>
</template>

<style lang="less" scoped>

</style>
