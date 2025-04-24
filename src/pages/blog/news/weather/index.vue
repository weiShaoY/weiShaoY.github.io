<script lang="ts" setup>
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
    detail: [

    ],
  },
  air: {
    forecasttime: '2024-12-19 15:00',
    aqi: 91,
    aq: 2,
    text: '良',
    aqiCode: '99031;99032;99033;99035;99037;99038;99039;99040',
  },
  tempchart: [
  ],
  passedchart: [],
  climate: {
    time: '',
    month: [

    ],
  },
  radar: {
    title: '实时雷达数据',
    image: '',
    url: '',
  },
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
  const selectedProvince = provinceCityData.find(
    region => region.code === province.value,
  )

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
      <el-select
        v-model="province"
        placeholder="请选择"
        size="large"
        class="!w-60"
        @change="handleProvinceChange"
      >
        <el-option
          v-for="item in provinceSelectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-select
        v-model="city"
        placeholder="请选择大区"
        size="large"
        class="!w-60"
        @change="getData"
      >
        <el-option
          v-for="item in citySelectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>


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
      class=""
    >
      <Meter
        v-if="data.tempchart.length && !isLoading"
        v-model="data"
      />

      <a-tabs
        class="w-full"
        default-active-key="2"
      >
        <a-tab-pane
          key="1"
          title="预报数据"
        >
          <TempChart
            v-if="data.tempchart.length"
            v-model="data"
          />
        </a-tab-pane>

        <a-tab-pane
          key="2"
          title="24小时实时天气"
        >
          <PassedChart
            v-if="data.passedchart.length"
            v-model="data"
          />
        </a-tab-pane>
      </a-tabs>

      <a-divider />

      <Climate
        v-if="data.tempchart.length"
        v-model="data"
      />
    </div>
  </div>
</template>
