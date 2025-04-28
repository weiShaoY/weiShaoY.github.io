<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import { copyImageToClipboard } from '@/utils'

import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

import Player from 'xgplayer'

import 'xgplayer/dist/index.min.css'

/**
 * 组件 Props 定义
 */
type VideoPlayerPropsType = {

  /** 视频 URL 地址 */
  videoUrl: string

  /** 是否自动播放，默认 false */
  isAutoPlay?: boolean

  /** 是否自动播放下一个视频，默认 true */
  isAutoPlayNext?: boolean

  /**
   * 附加的 class 类名
   * 支持 string、对象、数组的格式
   */
  class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>

  /** 行内样式 */
  style?: CSSProperties
}

const props = withDefaults(defineProps<VideoPlayerPropsType>(), {
  isAutoPlay: false,
  isAutoPlayNext: true,
})

const emit = defineEmits<{

  /** 视频播放结束时触发 */
  (event: 'playEnded'): void

  /** 播放下一个视频时触发 */
  (event: 'playNext'): void
}>()

/** 视频容器 DOM 引用 */
const videoRef = ref<HTMLElement | null>(null)

/** 播放器实例 */
const player = ref<Player | null>(null)

/**
 * 计算最终渲染的 class
 */
const wrapperClass = computed(() => props.class)

/**
 * 初始化播放器
 */
function initPlayer() {
  if (!videoRef.value) {
    return
  }

  player.value = new Player({
    el: videoRef.value,
    url: props.videoUrl,
    autoplay: props.isAutoPlay,
    height: '100%',
    width: '100%',
    lang: 'zh',
    autoplayMuted: true,
    marginControls: true,
    screenShot: {
      saveImg: true,
      quality: 1,
    },
    videoAttributes: {
      crossOrigin: 'anonymous',
    },
    enableContextmenu: true,
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

  bindPlayerEvents()
}

/**
 * 绑定播放器事件
 */
function bindPlayerEvents() {
  if (!player.value) {
    return
  }

  // 播放结束时触发
  player.value.on(Player.Events.ENDED, () => {
    emit('playEnded')
  })

  // 播放下一个视频时触发
  player.value.on(Player.Events.PLAYNEXT, () => {
    emit('playNext')
  })

  // 截图成功时触发
  player.value.on(Player.Events.SCREEN_SHOT, (url: string) => {
    window.$notification?.success({
      message: '截图下载成功',
    })
    copyImageToClipboard(url)
  })
}

/**
 * 销毁播放器
 */
function destroyPlayer() {
  if (player.value) {
    player.value.destroy()
    player.value = null
  }
}

// 生命周期钩子：组件挂载时初始化播放器
onMounted(() => {
  initPlayer()
})

// 生命周期钩子：组件卸载前销毁播放器
onBeforeUnmount(() => {
  destroyPlayer()
})

/**
 * 监听视频 URL 变化，重新加载视频
 */
watch(
  () => props.videoUrl,
  (newUrl) => {
    if (player.value && newUrl) {
      player.value.src = newUrl
      player.value.load()
    }
  },
)

/**
 * 监听是否自动播放变化
 */
watch(
  () => props.isAutoPlay,
  (newAutoPlay) => {
    if (player.value) {
      player.value.autoplay = newAutoPlay
    }
  },
)
</script>

<template>
  <div
    ref="videoRef"
    :class="wrapperClass"
    :style="props.style"
  />
</template>

<style scoped></style>
