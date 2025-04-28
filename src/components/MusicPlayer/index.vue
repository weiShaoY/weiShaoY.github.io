<script lang="ts" setup>
import type { CSSProperties } from 'vue'

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
 * 组件参数类型定义
 */
type VideoPlayerPropsType = {

  /**
   * 音频播放地址
   */
  musicUrl: string

  /**
   * 是否自动播放
   * @default false
   */
  isAutoPlay?: boolean

  /**
   * 是否自动播放下一个
   * @default true
   */
  isAutoPlayNext?: boolean

  /**
   * 自定义 class，支持 string | string[] | Record<string, boolean>
   */
  class?: string | string[] | Record<string, boolean>

  /**
   * 行内样式
   */
  style?: CSSProperties
}

const props = withDefaults(defineProps<VideoPlayerPropsType>(), {
  isAutoPlay: false,
  isAutoPlayNext: true,
})

/**
 * 组件发出的事件
 */
const emit = defineEmits<{
  (e: 'playEnded'): void
  (e: 'playNext'): void
}>()

/**
 * 音频容器 DOM 引用
 */
const musicRef = ref<HTMLElement | null>(null)

/**
 * 音频播放器实例
 */
const player = ref<Player | null>(null)

/**
 * 计算容器的 class，统一处理传入的三种格式
 */
const wrapperClass = computed(() => props.class)

/**
 * 初始化播放器
 */
function initPlayer() {
  if (!musicRef.value) {
    return
  }

  player.value = new Player({
    el: musicRef.value,
    url: props.musicUrl,
    autoplay: props.isAutoPlay,
    height: '100%',
    width: '100%',
    mediaType: 'audio',
    lang: 'zh',
    ignores: ['playbackrate'],
    controls: {
      initShow: true,
      mode: 'flex',
    },
    marginControls: true,
    videoAttributes: {
      crossOrigin: 'anonymous',
    },
    enableContextmenu: true,
    download: true,
    dynamicBg: {
      disable: false,
    },
    playnext: {
      urlList: [props.musicUrl],
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
}

/**
 * 销毁播放器
 */
function destroyPlayer() {
  player.value?.destroy()
  player.value = null
}

// 组件挂载时初始化播放器
onMounted(() => {
  initPlayer()
})

// 组件卸载时销毁播放器
onBeforeUnmount(() => {
  destroyPlayer()
})

// 监听音频地址变化，切换音频
watch(
  () => props.musicUrl,
  (newUrl) => {
    if (player.value && newUrl) {
      player.value.src = newUrl
      player.value.load()
    }
  },
)

// 监听是否自动播放变化
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
    ref="musicRef"
    :class="wrapperClass"
    :style="props.style"
  />
</template>
