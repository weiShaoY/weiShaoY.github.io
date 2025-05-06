<!------  it资讯 2025-05-06---00:40---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { BlogApi } from '@/api'

import { ref } from 'vue'

const isLoading = ref(false)

const data = ref<any>([])

/**
 *  清空数据
 */
function clearData() {
  data.value = []
}

async function getData() {
  try {
    isLoading.value = true

    const response = await BlogApi.getItNews()

    data.value = response
    console.log('%c Line:26 🍓 data.value', 'color:#e41a6a', data.value)
  }
  catch (error: any) {
    window.$notification?.error({
      title: '获取数据失败，请稍后重试',
      message: error.message,
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
    <el-link
      v-for="(item, index) in data"
      :key="index"
      class="my-3 !color-black"
      :href="item.url"
      target="_blank"
    >
      <span
        class="w-6"
      >
        {{ item.index }}、
      </span>

      <span
        class="mx-5 w-20"
      >
        {{ item.hot }}
      </span>

      <span>
        {{ item.title }}
      </span>

    </el-link>
  </div>
</template>

<style lang="less" scoped>

</style>
