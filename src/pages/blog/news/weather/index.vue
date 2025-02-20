<script lang="ts" setup>
import { BlogApi } from '@/api'

import { Notification } from '@arco-design/web-vue'

import { provinceCityData } from './data'

const isLoading = ref(false)

const province = ref('AHN') // 当前选择的省份

const city = ref('zOenJ') // 当前选择的城市

const data = ref<any>({
})

/**
 * 省份选项
 */
const provinceSelectOptions = provinceCityData.map((item) => {
  return {
    value: item.code,
    label: item.name,
  }
})

/**
 * 城市选项
 * 根据当前选择的省份来动态生成城市列表
 */
const citySelectOptions = computed(() => {
  const selectedProvince = provinceCityData.find(region => region.code === province.value)

  return selectedProvince
    ? selectedProvince.children.map(city => ({
        value: city.code,
        label: city.city,
      }))
    : []
})

/**
 * 清空数据
 */
function clearData() {
  data.value = {
  }
}

async function getData() {
  try {
    if (!province.value || !city.value) {
      return
    }

    clearData()

    isLoading.value = true

    const response = await BlogApi.getWeather(city.value)

    data.value = response
  }
  catch (error: any) {
    Notification.error(error.message || '获取数据失败，请稍后重试')

    clearData()
  }
  finally {
    isLoading.value = false
  }
}

/**
 * 处理省份变更，更新城市的默认选项
 */
async function handleProvinceChange() {
  // 在省份改变时，设置城市的默认值为该省的第一个城市
  if (citySelectOptions.value.length > 0) {
    city.value = citySelectOptions.value[0].value
  }

  await getData()
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
      <a-select
        v-model="province"
        :options="provinceSelectOptions"
        class="w-40"
        placeholder="请选择大区"
        @change="handleProvinceChange"
      />

      <a-select
        v-model="city"
        class="w-40"
        placeholder="请选择英雄"
        allow-search
        :options="citySelectOptions"
        @change="getData"
      />

      <div
        v-if="data.real && data.real.publish_time"
        class="m-l-10"
      >
        数据为
        <span
          class="color-red"
        >
          {{ data.real.publish_time.slice(-5) }}
        </span>
        更新
      </div>
    </div>

    <div
      class="bg-green color-red"
    >
      <!-- {{ data }} -->
    </div>
  </div>
</template>
