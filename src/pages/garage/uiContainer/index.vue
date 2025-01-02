<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { PageActionType } from '../types'

import { useGarageStore } from '@/store'

import Game from './components/game/index.vue'

import Load from './components/load/index.vue'

const garageStore = useGarageStore()

function handleHideLoad(value: PageActionType) {
  console.log('%c Line:23 🌶 value', 'color:#93c0a4', value)

  garageStore.dispatchAction(value)
}

function handleShowGame(value: PageActionType) {
  console.log('%c Line:24 🥟 value', 'color:#93c0a4', value)
  garageStore.dispatchAction(value)
}

// 音频播放逻辑监听
watch(() => garageStore.interact.audioAllowed, (newVal) => {
  if (newVal) {
    // TODO: 播放音乐
  }
})
</script>

<template>

  <div
    class="absolute left-0 top-0 h-screen w-screen"
    @pointerup="garageStore.interact.touch = false"
  >
    <!-- v-if="garageStore.game.status" -->

    <Game />

    <Load
      v-if="garageStore.load.status"
      @hide-load="handleHideLoad"
      @show-game="handleShowGame"
    />
  </div>
</template>

<style lang="less" scoped>

</style>
