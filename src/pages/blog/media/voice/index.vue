<script lang="ts" setup>
import { BlogApi } from '@/api'

import { ref } from 'vue'

const isLoading = ref(false)

const category = ref(1)

const musicUrl = ref('')

const isAutoPlay = ref(false)

const isAutoPlayNext = ref(true)

const categoryOptions = [
  {
    value: 0,
    label: '绿茶',
  },
  {
    value: 1,
    label: '怼人',
  },
  {
    value: 2,
    label: '御姐撒娇',
  },
]

const categoryApiMap: Record<number, () => Promise<string>> = {
  0: BlogApi.getRandomGreenTeaVoice,
  1: BlogApi.getRandomDuiRenVoice,
  2: BlogApi.getRandomYujieVoice,
}

async function getData() {
  try {
    isLoading.value = true
    const fetchData = categoryApiMap[category.value]

    const response = await fetchData()

    musicUrl.value = response || ''

    if (!response) {
      throw new Error('未获取到视频资源')
    }
  }
  catch (error: any) {
    window.$notification?.error({
      title: '获取数据失败，请稍后重试',
      message: error.message,
    })
  }
  finally {
    isLoading.value = false
  }
}

function handlePlayEnded() {
  if (isAutoPlayNext.value) {
    isAutoPlay.value = true
    getData()
  }
}

function handlePlayNext() {
  getData()
}

onMounted(async () => {
  await getData()
})
</script>

<template>
  <div
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >
    <div
      class="flex items-center gap-5"
    >

      <el-select
        v-model="category"
        placeholder="请选择"
        size="large"
        class="!w-60"
        @change="getData"
      >
        <el-option
          v-for="item in categoryOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <BaseButton
        tooltip-content="刷新"
        icon="blog-refresh"
        :loading="isLoading"
        @click="getData"
      />

      <DownloadButton
        tooltip-content="下载语音"
        :url="musicUrl"
        type="audio"
      />

      <el-switch
        v-model="isAutoPlayNext"
        size="large"
        inline-prompt
        style="--el-switch-on-color: #F3B03D;"
        active-text="自动播放下一个语音"
        inactive-text="手动播放下一个语音"
      />
    </div>

    <div
      class="h-[calc(100vh-240px)] flex items-center justify-center"
    >
      <MusicPlayer
        :music-url="musicUrl"
        :is-auto-play="isAutoPlay"
        :is-auto-play-next="isAutoPlayNext"
        @play-ended="handlePlayEnded"
        @play-next="handlePlayNext"
      />
    </div>
  </div>
</template>
