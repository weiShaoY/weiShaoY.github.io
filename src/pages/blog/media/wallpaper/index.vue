<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { BlogApi } from '@/api'

import { downloadImage } from '@/utils'

import { Notification } from '@arco-design/web-vue'

const isLoading = ref(false)

/**
 *  分类
 */
const category = ref('sg')

/**
 *  分类选项
 */
const categoryOptions = [
  {
    value: 'fj',
    label: '风景',
  },
  {
    value: 'yx',
    label: '游戏',
  },
  {
    value: 'mn',
    label: '美女',
  },
  {
    value: 'cy',
    label: '视觉创意',
  },
  {
    value: 'mxys',
    label: '明星影视',
  },
  {
    value: 'qc',
    label: '汽车',
  },
  {
    value: 'dw',
    label: '动物',
  },
  {
    value: 'xqs',
    label: '小清新',
  },
  {
    value: 'ty',
    label: '体育',
  },
  {
    value: 'js',
    label: '军事',
  },
  {
    value: 'dm',
    label: '动漫',
  },
  {
    value: 'qg',
    label: '情感',
  },
  {
    value: 'wz',
    label: '文字',
  },
  {
    value: 'tui',
    label: '腿',
  },
  {
    value: 'sg',
    label: '帅哥',
  },
]

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

    if (category.value === 'tui') {
      const response = await BlogApi.getTuiImage()

      data.value = response.text
    }
    else if (category.value === 'sg') {
      const response = await BlogApi.getRandomManImage()

      data.value = response.img
    }
    else {
      const response = await BlogApi.getWallpaper(category.value)

      data.value = response.img_url
    }
  }
  catch (error: any) {
    Notification.error(error.message || '获取数据失败，请稍后重试')
  }
  finally {
    isLoading.value = false
  }
}

getData()

watchEffect(() => {
  console.log('%c Line:120 🥃 keyword.value', 'color:#3f7cff', data.value)
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

    <PreviewImg
      :src="data"
      :is-loading="isLoading"
    />

  </div>
</template>

<style lang="less" scoped>

</style>
