<script lang="ts" setup>
import { BlogApi } from '@/api'

import { Notification } from '@arco-design/web-vue'

import { ref } from 'vue'

const isLoading = ref(false)

const category = ref(0)

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
    Notification.error(error.message || '获取数据失败，请稍后重试')
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

onMounted(() => {
  getData()
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

      <a-switch
        v-model="isAutoPlayNext"
        checked-color="#7777FF"
        unchecked-color="#BFBFBF"
        size="medium"
      >
        <template
          #checked
        >
          自动播放下一个语音
        </template>

        <template
          #unchecked
        >
          手动播放下一个语音
        </template>
      </a-switch>
    </div>

    <MusicPlayer
      :music-url="musicUrl"
      :is-auto-play="isAutoPlay"
      :is-auto-play-next="isAutoPlayNext"
      @play-ended="handlePlayEnded"
      @play-next="handlePlayNext"
    />
  </div>
</template>
