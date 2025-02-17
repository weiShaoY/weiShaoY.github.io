<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import { copyImageToClipboard } from '@/utils'

import {
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

import Player from 'xgplayer'

import 'xgplayer/dist/index.min.css'

type VideoPlayerPropsType = {

  /**
   * 视频 URL
   */
  videoUrl: string

  /**
   *  是否自动播放
   */
  isAutoPlay?: boolean

  /**
   *  是否自动播放下一个视频
   */
  isAutoPlayNext?: boolean

  /**
   *  额外的 CSS 类名
   */
  class?: string

  /**
   * 行内样式
   */
  style?: CSSProperties
}

const props = withDefaults(defineProps<VideoPlayerPropsType>(), {
  isAutoPlay: false,
  isAutoPlayNext: true,
})

const emit = defineEmits(['playEnded', 'playNext'])

const videoRef = ref<HTMLElement | null>(null)

const player = ref<Player | null>(null)

onMounted(() => {
  if (!videoRef.value) {
    return
  }

  player.value = new Player({
    el: videoRef.value,
    url: props.videoUrl,
    height: '100%',
    width: '100%',
    lang: 'zh',
    autoplay: props.isAutoPlay,
    autoplayMuted: true,
    marginControls: true,
    screenShot: {
      saveImg: false,
      quality: 0.92,
    },
    videoAttributes: {
      crossOrigin: 'anonymous',
    },
    enableContextmenu: true,
    download: true,
    dynamicBg: {
      disable: false,
    },
    playnext: {
      urlList: [props.videoUrl],
    },
    rotate: {
      disable: false,
    },
  })

  // 监听播放结束
  player.value.on(Player.Events.ENDED, () => {
    emit('playEnded')
  })

  // 监听播放下一个
  player.value.on(Player.Events.PLAYNEXT, () => {
    emit('playNext')
  })

  // 监听截图
  player.value.on(Player.Events.SCREEN_SHOT, (url: string) => {
    copyImageToClipboard(url)
  })
})

watch(
  () => props.videoUrl,
  (newUrl) => {
    if (player.value && newUrl) {
      player.value.src = newUrl
      player.value.load()
    }
  },
)

watch(
  () => props.isAutoPlay,
  (newAutoPlay) => {
    if (player.value) {
      player.value.autoplay = newAutoPlay
    }
  },
)

onBeforeUnmount(() => {
  if (player.value) {
    player.value.destroy()
    player.value = null
  }
})
</script>

<template>
  <div
    ref="videoRef"
  />
</template>
