<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import { BlogApi } from '@/api'

import { downloadImage } from '@/utils'

import { Notification } from '@arco-design/web-vue'

import Player from 'xgplayer'

import 'xgplayer/dist/index.min.css'

const isLoading = ref(false)

/**
 *  分类
 */
const category = ref(1)

/**
 *  分类选项
 */
const categoryOptions = [
  {
    value: 1,
    label: '随机美少女视频',
  },
  {
    value: 2,
    label: '随机返回一条小姐姐视频',
  },
]

/**
 *  分类接口映射
 */
const categoryApiMap: Record<number, () => Promise<string>> = {
  1: BlogApi.getRandomGirlVideo,
  2: BlogApi.getRandomReturnOneGirlVideo,
}

/**
 *  关键字
 */
const data = ref('')

/**
 * 获取壁纸数据
 */
async function getData() {
  try {
    isLoading.value = true

    const fetchData = categoryApiMap[category.value]

    const response = await fetchData()

    if (response) {
      data.value = response
    }
    else {
      throw new Error('未获取到视频资源')
    }
  }
  catch (error: any) {
    Notification.error(error.message || '获取数据失败，请稍后重试')
  }
  finally {
    isLoading.value = false
  }
}

watchEffect(() => {
  console.log('%c Line:120 🥃 keyword.value', 'color:#3f7cff', data.value)
})

const isAutoPlayNext = ref(false)

const isAutoPlay = ref(false)

const videoRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  await getData()

  if (!videoRef.value) {
    return
  }

  const player = new Player({
    el: videoRef.value,

    url: data.value,

    height: '100%',

    width: '100%',

    /**
     *  播放器初始显示语言
     */
    lang: 'zh',

    /**
     *  自动播放
     */
    autoplay: isAutoPlay.value,

    /**
     *  自动静音自动播放
     */
    autoplayMuted: true,

    /**
     *  开启画面和控制栏分离模式
     */
    marginControls: true,

    /**
     *  截图配置
     */
    screenShot: {
      saveImg: false, // 禁止截图后下载图片
      quality: 0.92,
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
      urlList: [data.value],
    },

    /**
     *  播放器旋转控件
     */
    rotate: {
      disable: false,
    },
  })

  /**
   *  视频播放结束
   */
  player.on(Player.Events.ENDED, () => {
    if (isAutoPlayNext.value) {
      if (!isAutoPlay.value) {
        isAutoPlay.value = true
      }

      getData()
    }
  })

  /**
   *  视频截图结束
   */
  player.on(Player.Events.SCREEN_SHOT, (url) => {
    // copyImageToClipboard(url)
  })

  /**
   *  点击按钮播放下一个视频源的时候触发
   */
  player.on(Player.Events.PLAYNEXT, async () => {
    if (!isAutoPlay.value) {
      isAutoPlay.value = true
    }

    await getData()
  })
})

</script>

<template>
  <div
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >

    <div
      class="flex items-center gap-5"
    >
      <a-select
        v-model="category"
        :options="categoryOptions"
        class="w-40"
        placeholder="请选择"
        allow-clear
        allow-search
        @change="getData"
      />

      <a-button
        :loading="isLoading"
        @click="getData"
      >
        <template
          #icon
        >
          <SvgIcon
            icon="blog-refresh"
          />
        </template>

      </a-button>

      <a-button
        @click="downloadImage(data)"
      >
        <template
          #icon
        >
          <SvgIcon
            icon="blog-download"
          />
        </template>

      </a-button>
    </div>

    <div
      ref="videoRef"
    />

  </div>
</template>

<style lang="less" scoped>

</style>
