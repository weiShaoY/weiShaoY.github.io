<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import { copyImageToClipboard } from '@/utils'

import { Notification } from '@arco-design/web-vue'

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

    autoplay: props.isAutoPlay,

    height: '100%',

    width: '100%',

    lang: 'zh',

    /**
     *  是否自动静音自动播放
     */
    autoplayMuted: true,

    /**
     *  开启画面和控制栏分离模式
     */
    marginControls: true,

    /**
     *  播放器内部截图
     */
    screenShot: {
      /**
       *  是否保存截图
       */
      saveImg: true,

      /**
       *  截图质量
       */
      quality: 1,
    },

    /**
     *  video扩展属性
     */
    videoAttributes: {
      crossOrigin: 'anonymous',
    },

    /**
     *  播放器区域是否允许右键功能菜单
     */
    enableContextmenu: true,

    /**
     *  下载
     */
    // download: true,

    /**
     *  动态背景高斯模糊渲染插件
     */
    dynamicBg: {

      disable: false,
    },

    /**
     *  控制栏播放下一个视频按钮插件
     */
    playnext: {
      urlList: [props.videoUrl],
    },

    /**
     *  播放器旋转控件
     */
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
    Notification.success('截图下载成功')

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
