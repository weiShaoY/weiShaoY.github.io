<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { PageActionType } from '../types'

import { useGarageStore } from '@/store'

import Bar from './components/bar/index.vue'

import Loading from './components/loading/index.vue'

const garageStore = useGarageStore()

// 音频播放逻辑监听
watch(() => garageStore.interact.audioAllowed, (newVal) => {
  if (newVal) {
    // TODO: 播放音乐
  }
})

function pageActionChange(value: PageActionType) {
  garageStore.dispatchAction(value)
}

</script>

<template>

  <div
    class="absolute left-0 top-0 h-screen w-screen"
    @pointerup="garageStore.interact.touch = false"
  >

    <Bar
      v-if="
        garageStore.ui.bar.status"
    />

    <Loading
      v-if="
        garageStore.ui.loading.status"
      @hide-loading="pageActionChange"
      @show-bar="pageActionChange"
    />
  </div>
</template>

<style lang="less" scoped>

</style>
