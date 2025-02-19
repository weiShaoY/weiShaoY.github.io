<script lang="ts" setup>
import { BlogApi } from '@/api'

import { Notification } from '@arco-design/web-vue'

import { ref } from 'vue'

const isLoading = ref(false)

const licensePlate = ref('京A12345')

const licensePlateData = ref<any>({
})

/**
 *  清空数据
 */
function clearData() {
  licensePlateData.value = {
  }
}

async function getData() {
  try {
    if (!licensePlate.value) {
      throw new Error('请输入车牌')
    }

    clearData()

    isLoading.value = true

    const response = await BlogApi.getLicensePlateNumberInfo(licensePlate.value)

    licensePlateData.value = response
  }
  catch (error: any) {
    Notification.error(error.message || '获取数据失败，请稍后重试')

    clearData()
  }
  finally {
    isLoading.value = false
  }
}

const typeMap: Record<string, string> = {
  10: '民用',
  20: '军用',
  30: '使馆',
  40: '民航',
  50: '武警',
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
      <a-input-search
        v-model="licensePlate"
        class="w-[60%]"
        allow-clear
        search-button
        placeholder="请输入车牌"
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
          搜索
        </template>
      </a-input-search>

    </div>

    <a-spin
      :loading="isLoading"
    >
      <a-descriptions
        :column="{ xs: 1, md: 1, lg: 1 }"
        bordered
      >

        <a-descriptions-item
          :span="1"
          label="省份"
        >
          {{ licensePlateData.province_name }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="城市"
        >
          {{ licensePlateData.city }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="机构名称"
        >
          {{ licensePlateData.organization }}
        </a-descriptions-item>

        <a-descriptions-item
          :span="1"
          label="类型编码"
        >
          <span
            v-if="licensePlateData.type"
          >
            {{ typeMap[licensePlateData.type] }}
          </span>
        </a-descriptions-item>
      </a-descriptions>

    </a-spin>

  </div>
</template>
