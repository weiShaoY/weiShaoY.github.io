<script lang="ts" setup>
import { BlogApi } from '@/api'

import { Notification } from '@arco-design/web-vue'

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
    Notification.error(error.message || '获取数据失败，请稍后重试')

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
      <a-input-search
        v-model="tracking"
        class="w-[50%]"
        allow-clear
        search-button
        placeholder="请输入快递单号"
        :loading="isLoading"
        @search="getData"
        @press-enter="getData"
        @clear="clearData"
      >
        <template
          #button-icon
        >
          <SvgIcon
            icon="blog-search"
          />
        </template>

        <template
          #button-default
        >
          快递单号搜索
        </template>
      </a-input-search>

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

    <a-spin
      :loading="isLoading"
    >

      <a-timeline
        mode="left"
        label-position="relative"
      >
        <a-timeline-item
          v-for="(item, index) in trackingData.trackingDetails"
          :key="index"
          :label="item.time"
        >
          <template
            v-if="index === 0"
            #dot
          >
            <SvgIcon
              :size="30"
              icon="blog-tracking-new"
            />
          </template>

          <a-row
            :style="{ display: 'inline-flex', alignItems: 'center' }"
          >
            {{ item.description }}

          </a-row>
        </a-timeline-item>

      </a-timeline>

    </a-spin>

  </div>
</template>
