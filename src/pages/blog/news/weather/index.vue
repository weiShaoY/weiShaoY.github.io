<script lang="ts" setup>
import type { WeatherType } from './types'

import { BlogApi } from '@/api'

import { Notification } from '@arco-design/web-vue'

import TempChart from './components/tempChart/index.vue'

import { provinceCityData } from './data' // 当前选择的城市

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
      {
        date: '',
        pt: '',
        day: {
          weather: {
            info: 'Clear',
            img: '01',
            temperature: '20',
          },
          wind: {
            direct: 'North',
            power: '1级',
          },
        },
        night: {
          weather: {
            info: 'Clear',
            img: '01',
            temperature: '15',
          },
          wind: {
            direct: 'North',
            power: '1级',
          },
        },
        precipitation: 0,
      },
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
    // {
    //   time: '2024-01-01T12:00:00Z',
    //   max_temp: 25,
    //   min_temp: 18,
    //   day_img: '01',
    //   day_text: 'Clear',
    //   night_img: '01',
    //   night_text: 'Clear',
    // },
  ],
  passedchart: [
    {
      rain1h: 0,
      rain6h: 0,
      rain12h: 0,
      rain24h: 0,
      temperature: 20,
      tempDiff: '',
      humidity: 50,
      pressure: 1013,
      windDirection: 0,
      windSpeed: 0,
      time: '2024-01-01T00:00:00Z',
    },
  ],
  climate: {
    time: '',
    month: [
      {
        month: 1,
        maxTemp: 25,
        minTemp: 18,
        precipitation: 0,
      },
      {
        month: 2,
        maxTemp: 25,
        minTemp: 18,
        precipitation: 0,
      },
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
        {
          date: '',
          pt: '',
          day: {
            weather: {
              info: 'Clear',
              img: '01',
              temperature: '20',
            },
            wind: {
              direct: 'North',
              power: '1级',
            },
          },
          night: {
            weather: {
              info: 'Clear',
              img: '01',
              temperature: '15',
            },
            wind: {
              direct: 'North',
              power: '1级',
            },
          },
          precipitation: 0,
        },
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
      {
        time: '2024-01-01T12:00:00Z',
        max_temp: 25,
        min_temp: 18,
        day_img: '01',
        day_text: 'Clear',
        night_img: '01',
        night_text: 'Clear',
      },
    ],
    passedchart: [
      {
        rain1h: 0,
        rain6h: 0,
        rain12h: 0,
        rain24h: 0,
        temperature: 20,
        tempDiff: '',
        humidity: 50,
        pressure: 1013,
        windDirection: 0,
        windSpeed: 0,
        time: '2024-01-01T00:00:00Z',
      },
    ],
    climate: {
      time: '',
      month: [
        {
          month: 1,
          maxTemp: 25,
          minTemp: 18,
          precipitation: 0,
        },
        {
          month: 2,
          maxTemp: 25,
          minTemp: 18,
          precipitation: 0,
        },
      ],
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
      class=""
    >
      <a-tabs
        class="w-full"
        default-active-key="1"
      >
        <a-tab-pane
          key="1"
          title="预报数据"
        >
          <TempChart
            v-if="data.tempchart"
            :data="data"
          />
        </a-tab-pane>

        <a-tab-pane
          key="2"
          title="24小时实时天气"
        >
          2
        </a-tab-pane>
      </a-tabs>
      <!-- {{ data }} -->
    </div>
  </div>
</template>
