<script lang="ts" setup>
import type { EChartsOption } from 'echarts'

import type { WeatherType } from '../../types'

import day_0 from '@/assets/svgs/blog-weather-day_0.svg'

import day_1 from '@/assets/svgs/blog-weather-day_1.svg'

import day_2 from '@/assets/svgs/blog-weather-day_2.svg'

import day_3 from '@/assets/svgs/blog-weather-day_3.svg'

import day_7 from '@/assets/svgs/blog-weather-day_7.svg'

import day_8 from '@/assets/svgs/blog-weather-day_8.svg'

import day_13 from '@/assets/svgs/blog-weather-day_13.svg'

import day_14 from '@/assets/svgs/blog-weather-day_14.svg'

import night_0 from '@/assets/svgs/blog-weather-night_0.svg'

import night_1 from '@/assets/svgs/blog-weather-night_1.svg'

import night_2 from '@/assets/svgs/blog-weather-night_2.svg'

import night_3 from '@/assets/svgs/blog-weather-night_3.svg'

import night_7 from '@/assets/svgs/blog-weather-night_7.svg'

import night_8 from '@/assets/svgs/blog-weather-night_8.svg'

import night_13 from '@/assets/svgs/blog-weather-night_13.svg'

import night_14 from '@/assets/svgs/blog-weather-night_14.svg'

const data = defineModel<WeatherType>({
  required: true,
})

const timeAxis = computed(() =>
  data.value.tempchart.map(item => item.time || ''),
)

const maxTempData = computed(() =>
  data.value.tempchart.map(item => item.max_temp),
)

/**
 *  最高温度
 */
const maxTemp = computed(
  () => Math.ceil((Math.max(...maxTempData.value) + 10) / 10) * 10,
)

const minTempData = computed(() =>
  data.value.tempchart.map(item => item.min_temp),
)

/**
 *  最低温度
 */
const minTemp = computed(
  () => Math.floor((Math.min(...minTempData.value) - 10) / 10) * 10,
)

const option = computed<EChartsOption>(() => {
  const formatDate = (value: string): string => {
    const [year, month, day] = value.split('/')

    const date = new Date(Number(year), Number(month) - 1, Number(day))

    const today = new Date()

    const tomorrow = new Date(today)

    const dayAfterTomorrow = new Date(today)

    tomorrow.setDate(today.getDate() + 1)
    dayAfterTomorrow.setDate(today.getDate() + 2)
    const formattedDate = `${month}/${day}`

    if (date.toDateString() === today.toDateString()) {
      return `{highlightDate|${formattedDate}}\n{highlightText|今天}`
    }

    if (date.toDateString() === tomorrow.toDateString()) {
      return `{highlightDate|${formattedDate}}\n{highlightText|明天}`
    }

    if (date.toDateString() === dayAfterTomorrow.toDateString()) {
      return `{highlightDate|${formattedDate}}\n{highlightText|后天}`
    }

    const dayOfWeek = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][
      date.getDay()
    ]

    return `${formattedDate}\n${dayOfWeek}`
  }

  const formatImage = (value: string, type: string): string => {
    if (value === '9999') {
      return ''
    }

    return `{${type}_${value}|}`
  }

  const imageMap = {
    day_0,
    day_1,
    day_2,
    day_3,
    day_7,
    day_8,
    day_13,
    day_14,
    night_0,
    night_1,
    night_2,
    night_3,
    night_7,
    night_8,
    night_13,
    night_14,
  }

  const createRichObject = (prefix: string) => {
    return Object.fromEntries(
      Object.entries(imageMap)
        .filter(([key]) => key.startsWith(prefix)) // 根据前缀过滤
        .map(([key, val]) => [
          key, // 保留原始的键名
          {
            backgroundColor: {
              image: val, // 使用对应的图片
            },
            fontSize: 40, // 设置字体大小
          },
        ]),
    )
  }

  // 示例使用，生成 day 和 night 的 rich 对象
  // const dayRichObject = createRichObject('day')

  // const nightRichObject = createRichObject('night')

  // console.log(dayRichObject)
  // console.log(nightRichObject)

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: (params: any) => {
        let relVal = params[0].name

        params.forEach((param: any) => {
          const isTemperature
            = param.seriesName === '最高温度' || param.seriesName === '最低温度'

          const isValidValue = param.value !== '9999'

          const suffix = isTemperature ? '°C' : ''

          if (isTemperature || isValidValue) {
            relVal += `<br/>${param.marker}${param.seriesName}     ${param.value}${suffix}`
          }
        })
        return relVal
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {
          show: true,
          title: '保存为图片',
        },
      },
    },
    xAxis: [
      {
        type: 'category',
        data: timeAxis.value,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisPointer: {
          label: {
            show: false,
          },
        },
        axisLabel: {
          formatter: formatDate,
          rich: {
            highlightDate: {
              color: 'red',
              fontWeight: 'bold',
            },
            highlightText: {
              color: 'blue',
              fontWeight: 'bold',
            },
          },
          interval: 0,
        },
      },
      {
        type: 'category',
        position: 'top',
        offset: -50,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisPointer: {
          show: false,
        },
        data: data.value.tempchart.map(item => item.day_img),
        axisLabel: {
          formatter: (value: string) => formatImage(value, 'day'),

          rich: createRichObject('day'),
        },
      },
      {
        type: 'category',
        position: 'bottom',
        offset: -50,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisPointer: {
          show: false,
        },
        data: data.value.tempchart.map(item => item.night_img),
        axisLabel: {
          formatter: (value: string) => formatImage(value, 'night'),

          rich: createRichObject('night'),
        },
      },
    ],
    yAxis: [
      {
        id: 'temperature',
        type: 'value',
        position: 'left',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#EE6666',
          },
        },
        axisLabel: {
          formatter: '{value} °C',
        },
        min: minTemp.value,
        max: maxTemp.value,
      },
    ],
    series: [
      {
        yAxisId: 'temperature',
        name: '最高温度',
        type: 'line',
        smooth: true,
        color: '#EE6666',
        data: maxTempData.value,
        label: {
          show: true,
          position: 'top',
          formatter: '{c}°C',
          color: '#EE6666',
        },
      },
      {
        yAxisId: 'temperature',
        name: '最低温度',
        type: 'line',
        smooth: true,
        color: '#5470C6',
        data: minTempData.value,
        label: {
          show: true,
          position: 'top',
          formatter: '{c}°C',
          color: '#5470C6',
        },
      },
      {
        name: '白天天气',
        type: 'line',
        smooth: true,
        color: '#FFA500',
        data: data.value.tempchart.map(item => item.day_text),
      },
      {
        name: '夜晚天气',
        type: 'line',
        smooth: true,
        color: '#8A2BE2',
        data: data.value.tempchart.map(item => item.night_text),
      },
    ],
  }
})
</script>

<template>
  <VueEcharts
    :option="option"
  />
</template>

<style lang="scss" scoped>

</style>
