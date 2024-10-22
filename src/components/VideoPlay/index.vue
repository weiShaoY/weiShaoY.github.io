<script setup lang="ts">
import videojs from 'video.js'

import { onBeforeUnmount, onMounted, ref } from 'vue'

import 'video.js/dist/video-js.css'

// 视频源路径 也可使用网络资源
const videoSrc = ref(new URL('./aaa.mp4', import.meta.url).href)

// 视频封面图路径 也可以使用网络图片
const poster = ref(new URL('./aaa.png', import.meta.url).href)

// 视频播放器引用
const videoPlayer = ref<HTMLElement | null>(null)

// 将player的类型设为any
let player: any = null

onMounted(() => {
  if (videoPlayer.value) {
    player = videojs(videoPlayer.value, {
      // 是否显示播放器控制条
      controls: true,

      // 自动播放
      autoplay: false,

      // 预加载策略。可选值包括 auto、metadata、none。
      preload: 'auto',

      // 设置封面图
      poster: poster.value,

      // 定义播放器使用的技术顺序。可选值包括 html5, flash, youtube, vimeo 等
      techOrder: ['html5', 'flash'],

      // 播放器的语言设置，支持 zh-CN, en, fr 等
      language: 'zh-CN',

      // 设置视频的宽高比。例如 16:9, 4:3
      aspectRatio: '16:9',
      responsive: true,
    })
  }
})

onBeforeUnmount(() => {
  if (player) {
    // 销毁播放器实例
    player.dispose()
  }
})
</script>

<template>
  <div
    class="video-container"
  >
    <video
      ref="videoPlayer"
      class="video-js vjs-default-skin"
      controls
      :poster="poster"
      height="460"
    >
      <source
        :src="videoSrc"
        type="video/mp4"
      >

      <p
        class="vjs-no-js"
      >请启用JavaScript以观看视频。</p>
    </video>
  </div>
</template>

<style scoped></style>
