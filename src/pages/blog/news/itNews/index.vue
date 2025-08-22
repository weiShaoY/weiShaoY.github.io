<!------  it资讯 2025-05-06---00:40---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import type { Ref } from 'vue'

import { onMounted, ref } from 'vue'

import { BlogApi } from '@/apis'

type NewsItem = {
  index: number
  hot: string
  title: string
  url: string
}

const isLoading: Ref<boolean> = ref(false)

const data: Ref<NewsItem[]> = ref([])

const error: Ref<string | null> = ref(null)

/**
 * 清空数据
 */
function clearData() {
  data.value = []
  error.value = null
}

/**
 * 获取IT新闻数据
 */
async function getData() {
  try {
    isLoading.value = true
    error.value = null
    const response = await BlogApi.getItNews()

    data.value = response
  }
  catch (err: any) {
    const errorMessage = err.message || '获取数据失败'

    error.value = errorMessage
    window.$notification?.error({
      title: '获取数据失败',
      message: errorMessage,
    })
    clearData()
  }
  finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await getData()
})
</script>

<template>
  <div
    class="h-full w-full flex flex-col items-start gap-3 p-3"
  >
    <el-skeleton
      :loading="isLoading"
      animated
    >
      <template
        #template
      >
        <div
          v-for="i in 5"
          :key="i"
          class="my-3 flex items-center gap-4"
        >
          <el-skeleton-item
            variant="text"
            style="width: 30px"
          />

          <el-skeleton-item
            variant="text"
            style="width: 100px"
          />

          <el-skeleton-item
            variant="text"
            style="width: 80%"
          />
        </div>
      </template>

      <template
        #default
      >
        <template
          v-if="error"
        >
          <el-empty
            description="加载失败，请重试"
          >
            <el-button
              type="primary"
              @click="getData"
            >
              重新加载
            </el-button>
          </el-empty>
        </template>

        <template
          v-else
        >
          <el-link
            v-for="(item, index) in data"
            :key="index"
            class="my-3 flex items-center rounded p-2 transition-colors duration-200 hover:bg-gray-50 hover:text-blue-600"
            :href="item.url"
            target="_blank"
          >
            <span
              class="w-6 text-gray-500"
            >
              {{ item.index }}、
            </span>

            <span
              class="mx-5 w-20 text-orange-500"
            >
              {{ item.hot }}
            </span>

            <span
              class="flex-1 truncate"
            >
              {{ item.title }}
            </span>
          </el-link>
        </template>
      </template>
    </el-skeleton>
  </div>
</template>

<style lang="scss" scoped>
</style>
