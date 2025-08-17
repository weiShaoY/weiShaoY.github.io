<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import { useGarageStore } from '@/stores'

import Bar from './components/bar/index.vue'

import Loading from './components/loading/index.vue'

const garageStore = useGarageStore()

// 音频播放逻辑监听
watch(() => garageStore.state.isMute, (newVal) => {
  if (newVal) {
    // TODO: 播放音乐
  }
})

</script>

<template>

  <div>
    <Loading
      v-if=" garageStore.state.isLoading"
    />

    <Bar
      v-else
    />

  </div>
</template>

<style lang="less" scoped>

</style>
