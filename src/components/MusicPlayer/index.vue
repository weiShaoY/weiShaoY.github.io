<script lang="ts" setup>
import type { CSSProperties } from 'vue'

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
  musicUrl: string

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

const musicRef = ref<HTMLElement | null>(null)

const player = ref<Player | null>(null)

onMounted(() => {
  if (!musicRef.value) {
    return
  }

  player.value = new Player({
    el: musicRef.value,

    // url: props.musicUrl,
    url: 'https://zj.v.api.aa1.cn/api/qqmusic/demo.php?type=3&mid=001tPuED43HIPj&fid=001tPuED43HIPj&t=3',

    autoplay: props.isAutoPlay,

    height: '100%',

    width: '100%',

    /**
     *  媒体类型
     */
    mediaType: 'audio',

    /**
     *  播放器初始显示语言
     */
    lang: 'zh',

    /**
     *  是否自动静音自动播放
     */
    // autoplayMuted: true,

    ignores: ['playbackrate'],
    controls: {
      initShow: true,
      mode: 'flex',
    },

    /**
     *  开启画面和控制栏分离模式
     */
    marginControls: true,

    /**
     *  截图
     */
    // screenShot: {

    //   /**
    //    *  是否保存截图
    //    */
    //   saveImg: false,
    //   quality: 1,
    // },

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
    download: true,

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
      urlList: [props.musicUrl],
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
})

watch(
  () => props.musicUrl,
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
    ref="musicRef"
  />
</template>
