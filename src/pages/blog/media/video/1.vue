<script lang="ts" setup>
import { BlogApi } from '@/api'

import { copyImageToClipboard, downloadImage } from '@/utils'

import { Notification } from '@arco-design/web-vue'

import Player from 'xgplayer'

import 'xgplayer/dist/index.min.css'

const player = ref<Player | null>(null)

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
 *  视频数据
 */
const videoUrl = ref('')

/**
 * 获取视频数据
 */
async function getData() {
  try {
    isLoading.value = true
    const fetchData = categoryApiMap[category.value]

    const response = await fetchData()

    if (response) {
      videoUrl.value = response
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

/**
 *  是否自动播放
 */
const isAutoPlay = ref(false)

/**
 *  是否自动播放下一个
 */
const isAutoPlayNext = ref(true)

const videoRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  await getData()

  if (!videoRef.value) {
    return
  }

  player.value = new Player({
    el: videoRef.value,
    url: videoUrl.value,
    height: '100%',
    width: '100%',
    lang: 'zh',
    autoplay: isAutoPlay.value,
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
      urlList: [videoUrl.value],
    },
    rotate: {
      disable: false,
    },
  })

  player.value.on(Player.Events.ENDED, async () => {
    if (isAutoPlayNext.value) {
      await getData()
    }
  })

  player.value.on(Player.Events.PLAYNEXT, async () => {
    await getData()
  })

  player.value.on(Player.Events.SCREEN_SHOT, (url) => {
    copyImageToClipboard(url)
  })

  watch(videoUrl, (newUrl) => {
    if (player.value && newUrl) {
      player.value.src = newUrl
      player.value.load()
    }
  })

  watch(isAutoPlay, (newAutoPlay) => {
    if (player.value) {
      player.value.autoplay = newAutoPlay
    }
  })
})

onBeforeUnmount(() => {
  if (player.value) {
    player.value.destroy()
    player.value = null
  }
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
        @click="downloadImage(videoUrl)"
      >
        <template
          #icon
        >
          <SvgIcon
            icon="blog-download"
          />
        </template>
      </a-button>

      <a-switch
        v-model="isAutoPlayNext"
        checked-color="#7777FF"
        unchecked-color="#BFBFBF"
        size="medium"
      >
        <template
          #checked
        >
          自动播放下一个视频
        </template>

        <template
          #unchecked
        >
          手动播放下一个视频
        </template>
      </a-switch>
    </div>

    <div
      ref="videoRef"
    />
  </div>
</template>

<style lang="less" scoped>
.h-full {
  height: 100%;
}

.w-full {
  width: 100%;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.gap-5 {
  gap: 1.25rem;
}

.overflow-hidden {
  overflow: hidden;
}

.items-center {
  align-items: center;
 ▋
