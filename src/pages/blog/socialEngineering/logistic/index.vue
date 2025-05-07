<script lang="ts" setup>
import { BlogApi } from '@/api'

import { ref } from 'vue'

const isLoading = ref(false)

const tracking = ref('773320599100571')

const trackingData = ref<any>({
})

/**
 *  清空数据
 */
function clearData() {
  trackingData.value = {
  }
}

async function getData() {
  try {
    if (!tracking.value) {
      throw new Error('请输入快递单号')
    }

    clearData()

    isLoading.value = true

    const response = await BlogApi.getExpressTracking(tracking.value)

    trackingData.value = response
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
    class="h-full w-full flex flex-col gap-5 overflow-hidden"
  >
    <div
      class="flex items-center gap-5"
    >

      <el-input
        v-model.trim="tracking"
        clearable
        size="large"
        placeholder="请输入快递单号"
        class="!max-w-[30%] !overflow-hidden"
        @keydown.enter.prevent="getData"
        @clear="clearData"
      >
        <template
          #append
        >
          <BaseButton
            icon="search"
            :loading="isLoading"
            @click="getData"
          />
        </template>
      </el-input>

      <div
        v-if="trackingData.expressName"
        class="m-l-10 flex items-center gap-3"
      >
        数据为
        <span
          class="text-5 color-red font-semibold"
        >
          {{ trackingData.expressName }}
        </span>
      </div>

      <div
        v-if="trackingData.transitTime"
        class="m-l-10 flex items-center gap-3"
      >
        耗时为
        <span
          class="text-5 color-green font-semibold"
        >
          {{ trackingData.transitTime }}
        </span>
      </div>

    </div>

    <el-timeline
      v-loading="isLoading"
      class="!ml-20 !w-200"
    >
      <el-timeline-item
        v-for="(item, index) in trackingData.trackingDetails"
        :key="index"
        :timestamp="item.time"
        placement="top"
      >
        <template
          v-if="index === 0"
          #dot
        >
          <SvgIcon
            :size="30"
            icon="blog-tracking-new"
            class="relative left-[-10px]"
          />
        </template>

        {{ item.description }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
