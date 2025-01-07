<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

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

/**
 * 页面动作类型
 * 定义了一组可能的页面操作类型，用于管理页面状态和行为的更改。
 * 每个操作类型都与特定的页面状态变化或操作相关。
 */
 type PageActionType =

// 加载页相关操作
   | 'show-loading' // 显示加载页
   | 'hide-loading' // 隐藏加载页
// 操作页相关操作
   | 'show-bar' // 显示游戏页面
   | 'hide-bar' // 隐藏游戏页面
// 音频相关操作
   | 'allow-audio' // 允许播放音乐
   | 'mute' // 静音操作
   | 'unmute' // 取消静音操作

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
