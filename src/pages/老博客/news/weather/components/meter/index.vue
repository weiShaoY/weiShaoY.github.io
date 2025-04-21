<script lang="ts" setup>
import type { EChartsOption } from 'echarts'

import type { WeatherType } from '../../types'

const data = defineModel<WeatherType>({
  required: true,
})

const option = computed<EChartsOption>(() => {
  return {
    series: [
      {
        name: '温度', // 仪表盘的名称
        type: 'gauge', // 图表类型为仪表盘
        max: 50, // 最大刻度值
        startAngle: 220, // 仪表盘开始角度
        endAngle: -40, // 仪表盘结束角度
        detail: {
          formatter: ['{value}℃', `{a|${data.value.real.station.city}}`].join('\n'), // 显示的数值和自定义文本格式
          fontSize: 20, // 数值字体大小
          width: '100%', // 数值显示的宽度
          height: 10, // 数值显示的高度
          padding: [-100, 0, 0, 0], // 数值显示的内边距
          rich: {
            a: {
              // color: "#666", // 自定义文本颜色
              fontSize: 14, // 自定义文本字体大小
              padding: [10, 0, 10, 0], // 自定义文本内边距
            },
          },
        },
        data: [
          {
            value: data.value.real.weather.temperature, // 仪表盘显示的当前数值
          },
        ],
        axisLine: {
          lineStyle: {
            color: [
              // 仪表盘的颜色范围
              [0.4, '#49afff'], // 前40%的颜色为蓝色
              [0.6, '#68A54A'], // 中间20%的颜色为绿色
              [1, '#f56c6c'], // 后40%的颜色为红色
            ],
            width: 12, // 仪表盘的线宽
          },
        },
        splitLine: {
          length: 6, // 分割线的长度
          lineStyle: {
            width: 2, // 分割线的宽度
          },
        },
        axisLabel: {
          distance: -40, // 刻度标签距离仪表盘的距离
          show: true, // 是否显示刻度标签
          formatter: (value: any) => {
            if (value === 0) {
              // 仅显示 0 和 50 的刻度值
              return `日出 ${data.value.real.sunriseSunset.sunrise.slice(-5)}`
            }

            if (value === 50) {
              // 仅显示 0 和 50 的刻度值
              return `日落 ${data.value.real.sunriseSunset.sunset.slice(-5)}`
            }

            return '' // 其他刻度不显示
          },
          lineHeight: -60, // 刻度标签的行高
          fontSize: 12, // 刻度标签的字体大小
          fontStyle: 'normal',
        },
        pointer: {
          show: false, // 隐藏指针
        },
        axisTick: {
          show: false, // 隐藏刻度
        },
      },
    ],
  }
})
</script>

<template>
  <div
    class="h-[200px] w-full flex items-center justify-between gap-5"
  >
    <div
      class="aspect-square h-full"
    >
      <!-- 仪表盘图表容器 -->
      <Chart
        :option="option"
      />
    </div>

    <div
      class="flex flex-1 items-center justify-between"
    >
      <div
        class="flex flex-col flex-1 items-center gap-1"
      >
        <SvgIcon
          icon="blog-weather-rain"
          :size="50"
        />

        <div>
          降水量
        </div>

        <div>
          {{ data.real.weather.rain }} mm
        </div>
      </div>

      <div
        class="flex flex-col flex-1 items-center gap-1"
      >
        <SvgIcon
          icon="blog-weather-direct"
          :size="50"
        />

        <div>
          {{ data.real.wind.direct }}
        </div>

        <div>
          {{ data.real.wind.power }}
        </div>
      </div>

      <div
        class="flex flex-col flex-1 items-center gap-1"
      >
        <SvgIcon
          icon="blog-weather-humidity"
          :size="50"
        />

        <div>
          相对湿度
        </div>

        <div>
          {{ data.real.weather.humidity }} %
        </div>
      </div>

      <div
        class="flex flex-col flex-1 items-center gap-1"
      >
        <SvgIcon
          icon="blog-weather-feelst"
          :size="50"
        />

        <div>
          体感温度
        </div>

        <div>
          {{ data.real.weather.feelst }} °C
        </div>
      </div>

      <div
        class="flex flex-col flex-1 items-center gap-1"
      >
        <SvgIcon
          icon="blog-weather-air"
          :size="50"
        />

        <div>
          空气质量
        </div>

        <div>
          {{ data.air.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
