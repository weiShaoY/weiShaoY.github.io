<script lang="ts" setup>
import type { CascaderValue } from 'element-plus'

import type { WeatherType } from './types'

import { BlogApi } from '@/api'

import { Notification } from '@arco-design/web-vue'

import Climate from './components/climate/index.vue'

import Meter from './components/meter/index.vue'

import PassedChart from './components/passedChart/index.vue'

import TempChart from './components/tempChart/index.vue'

import { provinceCityData } from './data'

const isLoading = ref(false)

const province = ref('AHN') // 当前选择的省份

const city = ref('zOenJ')

const data = ref<WeatherType>({
  real: {
    station: {
      code: 'defaultCode',
      province: 'defaultProvince',
      city: 'defaultCity',
      url: 'http://default.url',
    },
    publish_time: '2024-01-01T00:00:00Z',
    weather: {
      temperature: 0,
      temperatureDiff: 0,
      airpressure: 1013,
      humidity: 50,
      rain: 0,
      rcomfort: 0,
      icomfort: 0,
      info: 'Clear',
      img: '01',
      feelst: 20,
    },
    wind: {
      direct: 'North',
      degree: 0,
      power: '1级',
      speed: 0,
    },
    warn: {
      alert: 'No warnings',
      pic: '',
      province: '',
      city: '',
      url: '',
      issuecontent: '',
      fmeans: '',
      signaltype: '',
      signallevel: '',
      pic2: '',
    },
    sunriseSunset: {
      sunrise: '06:00',
      sunset: '18:00',
    },
  },
  predict: {
    station: {
      code: 'defaultCode',
      province: 'defaultProvince',
      city: 'defaultCity',
      url: 'http://default.url',
    },
    publish_time: '2024-01-01T00:00:00Z',
    detail: [],
  },
  air: {
    forecasttime: '2024-12-19 15:00',
    aqi: 91,
    aq: 2,
    text: '良',
    aqiCode: '99031;99032;99033;99035;99037;99038;99039;99040',
  },
  tempchart: [],
  passedchart: [],
  climate: {
    time: '',
    month: [],
  },
  radar: {
    title: '实时雷达数据',
    image: '',
    url: '',
  },
})

/**
 * 清空数据
 */
function clearData() {
  data.value = {
    real: {
      station: {
        code: 'defaultCode',
        province: 'defaultProvince',
        city: 'defaultCity',
        url: 'http://default.url',
      },
      publish_time: '2024-01-01T00:00:00Z',
      weather: {
        temperature: 0,
        temperatureDiff: 0,
        airpressure: 1013,
        humidity: 50,
        rain: 0,
        rcomfort: 0,
        icomfort: 0,
        info: 'Clear',
        img: '01',
        feelst: 20,
      },
      wind: {
        direct: 'North',
        degree: 0,
        power: '1级',
        speed: 0,
      },
      warn: {
        alert: 'No warnings',
        pic: '',
        province: '',
        city: '',
        url: '',
        issuecontent: '',
        fmeans: '',
        signaltype: '',
        signallevel: '',
        pic2: '',
      },
      sunriseSunset: {
        sunrise: '06:00',
        sunset: '18:00',
      },
    },
    predict: {
      station: {
        code: 'defaultCode',
        province: 'defaultProvince',
        city: 'defaultCity',
        url: 'http://default.url',
      },
      publish_time: '2024-01-01T00:00:00Z',
      detail: [],
    },
    air: {
      forecasttime: '2024-12-19 15:00',
      aqi: 91,
      aq: 2,
      text: '良',
      aqiCode: '99031;99032;99033;99035;99037;99038;99039;99040',
    },
    tempchart: [],
    passedchart: [],
    climate: {
      time: '',
      month: [],
    },
    radar: {
      title: '实时雷达数据',
      image: '',
      url: '',
    },
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

onMounted(async () => {
  await getData()
})

const options = provinceCityData.map((item) => {
  return {
    value: item.code,
    label: item.name,
    children: item.children.map(city => ({
      value: city.code,
      label: city.city,
    })),
  }
})

const value = ref(['AHN', 'zOenJ'])

const props = {
  expandTrigger: 'hover' as const,
}

async function handleChange(value: CascaderValue) {
  // 首先确保 value 是一个数组（非多选情况下）
  if (!Array.isArray(value)) {
    console.error('Cascader value should be an array in single-select mode')
    return
  }

  // 使用类型断言明确 value 是 string[] 或 number[]
  const selectedValues = value as string []

  // 提供默认值防止 undefined 访问
  province.value = selectedValues[0] ?? ''
  city.value = selectedValues[1] ?? ''

  await getData()
}

const activeTab = ref('realtime')
</script>

<template>
  <div
    class="h-full w-full flex flex-col"
  >
    <div
      class="flex items-center gap-5"
    >
      <el-cascader
        v-model="value"
        :options="options"
        :props="props"
        size="large"
        @change="handleChange"
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
      v-loading="isLoading"
      class="flex flex-col flex-1"
    >

      <Meter
        v-if="data.tempchart.length && !isLoading"
        v-model="data"
      />

      <el-tabs
        class="w-full"
      >
        <el-tab-pane
          label="预报数据"
        >
          <div
            class="h-[500px]"
          >
            <TempChart
              v-if="data.tempchart.length"
              v-model="data"
            />
          </div>
        </el-tab-pane>

        <el-tab-pane
          label="24小时实时天气"
          lazy
        >
          <div
            class="h-[500px]"
          >
            <PassedChart
              v-if="activeTab === 'realtime' && data.passedchart.length"
              v-model="data"
            />
          </div>
        </el-tab-pane>
      </el-tabs>

      <el-divider />

      <Climate
        v-if="data.tempchart.length"
        v-model="data"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// :deep(.el-cascader-menu__wrap.el-scrollbar__wrap) {
//   height: 300px !important;
// }
</style>
