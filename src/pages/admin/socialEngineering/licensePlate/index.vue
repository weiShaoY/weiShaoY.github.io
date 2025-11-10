<script lang="ts" setup>
import { ref } from 'vue'

import { AdminApi } from '@/apis'

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

    const response = await AdminApi.getLicensePlateNumberInfo(licensePlate.value)

    licensePlateData.value = response
    console.log('%c Line:36 🥪 licensePlateData.value', 'color:#93c0a4', licensePlateData.value)
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

const typeMap: Record<string, string> = {
  10: '民用',
  20: '军用',
  30: '使馆',
  40: '民航',
  50: '武警',
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
        v-model.trim="licensePlate"
        clearable
        size="large"
        placeholder="请输入车牌"
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
    </div>

    <el-descriptions
      v-loading="isLoading"
      :column="1"
      border
    >

      <el-descriptions-item
        :span="1"
        label="省份"
      >
        {{ licensePlateData.province_name }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="城市"
      >
        {{ licensePlateData.city }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="机构名称"
      >
        {{ licensePlateData.organization }}
      </el-descriptions-item>

      <el-descriptions-item
        :span="1"
        label="类型编码"
      >
        <span
          v-if="licensePlateData.type"
        >
          {{ typeMap[licensePlateData.type] }}
        </span>
      </el-descriptions-item>

    </el-descriptions>

  </div>
</template>
