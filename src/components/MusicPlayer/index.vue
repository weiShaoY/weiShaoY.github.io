<script lang="ts" setup>
import type { CSSProperties } from 'vue'

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
 * 计算容器的 class，统一处理传入的三种格式
 */
const wrapperClass = computed(() => props.class)

const player = ref({
  src: props.musicUrl,
  autoplay: props.isAutoPlay,
})

watch(
  () => props.musicUrl,
  (newUrl) => {
    if (player.value && newUrl) {
      player.value.src = newUrl
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
  <audio
    :class="wrapperClass"
    :src="player.src"
    controls
    :autoplay="player.autoplay"
    @ended="emit('playEnded')"
  />
</template>
