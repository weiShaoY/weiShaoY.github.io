<script lang="ts" setup>
import type { EChartsOption } from 'echarts'

import type { WeatherType } from '../../types'

const data = defineModel<WeatherType>({
  required: true,
})

const passedChart = computed(() =>
  [...data.value.passedchart].reverse(),
)

/**
 *  最新数据
 */
const latestData = computed(() => passedChart.value[passedChart.value.length - 1])

/**
 *  时间数据
 */
const timeAxis = computed (() =>
  passedChart.value.map((item) => {
    const time = item.time

    if (time) {
      return time.split(' ')[1]?.split(':')[0] // 安全访问，避免 undefined 或 null 引发错误
    }

    return '' // 如果 time 是 undefined 或 null，返回空字符串
  }),
)

/**
 *  温度数据
 */
const temperatureData = computed(() =>
  passedChart.value.map(item => item.temperature),
)

/**
 *  降水量
 */
const precipitationData = computed(() =>
  passedChart.value.map(item => item.rain1h),
)

/**
 *  相对湿度
 */
const humidityData = computed(() =>
  passedChart.value.map(item => item.humidity),
)

/**
 *  气压
 */
const pressureData = computed(() =>
  passedChart.value.map(item => item.pressure),
)

const option = computed<EChartsOption>(() => {
  return {

    title: {
      text: `最新整点实况 (${latestData.value.time}) :  气温:${latestData.value.temperature}°C  降水量:${latestData.value.rain1h}mm  相对湿度:${latestData.value.humidity}%  气压:${latestData.value.pressure}hPa`,
      textStyle: {
        fontFamily: 'gaiLiangShouJinTi',
        fontSize: 16,
      },
    },

    // 提示框配置
    tooltip: {
      trigger: 'axis', // 提示框触发方式，'axis' 表示触发坐标轴
      axisPointer: {
        type: 'cross', // 坐标轴指示器的类型，'cross' 交叉线
      },

      formatter: (params: any) => {
        let relVal = params[0].name

        for (let i = 0, l = params.length; i < l; i++) {
          // 后缀
          // eslint-disable-next-line style/no-tabs
          const suffix	= params[i].seriesName === '温度'
            ? '°C'
            : params[i].seriesName === '相对湿度'
              ? '%'
              : params[i].seriesName === '降水量'
                ? 'mm'
                : params[i].seriesName === '气压'
                  ? 'hPa'
                  : ''

          relVal += `<br/>${params[i].marker}${params[i].seriesName}     ${params[i].value}${suffix}`
        }

        return relVal
      },
    },

    grid: {
      right: '20%', // 网格右边的空白区域
    },

    // 工具箱配置，提供了一些常用功能
    toolbox: {
      feature: {
        saveAsImage: {
          show: true,
          title: '保存为图片',
        }, // 保存为图片功能，显示并能保存图表为图片
      },
    },

    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
      },
      data: timeAxis.value,

      axisLabel: {
        formatter: '{value}时',
        interval: 0, // 强制显示所有标签
      },
    },

    yAxis: [
      {
        id: 'temperature',
        type: 'value', // 数值轴，适用于连续的数据
        name: '温度', // y 轴名称
        position: 'left', // y 轴的位置（左侧）
        axisLine: {
          show: true, // 显示 y 轴的轴线
          lineStyle: {
            color: '#EE6666', // 轴线的颜色
          },
        },
        axisLabel: {
          formatter: '{value} °C', // 格式化 y 轴的标签，显示摄氏度符号
        },
      },
      {
        id: 'precipitation',
        type: 'value', // 第二个 y 轴类型为值轴
        name: '降水量', // y 轴名称
        position: 'right', // y 轴位置（右侧）
        axisLine: {
          show: true, // 显示 y 轴的轴线
          lineStyle: {
            color: '#91CC75', // 轴线的颜色
          },
        },
        axisLabel: {
          formatter: '{value} mm', // y 轴标签的格式化（显示毫米）
        },
      },
      {
        id: 'humidity',
        type: 'value', // 第四个 y 轴类型为值轴
        name: '相对湿度', // y 轴名称
        position: 'right', // y 轴位置（右侧）
        offset: 160, // 相对第一个 y 轴的偏移量
        axisLine: {
          show: true, // 显示 y 轴的轴线
          lineStyle: {
            color: '#9E4C47', // 轴线的颜色
          },
        },
        axisLabel: {
          formatter: '{value} %', // y 轴标签的格式化（显示百分比）
        },
        alignTicks: true, // 是否与坐标轴对齐
        min: 0, // 可选：设置最小刻度值为 0
        max: 100, // 设置最大刻度值为 100
      },
      {
        id: 'pressure',
        type: 'value', // 第三个 y 轴类型为值轴
        name: '气压', // y 轴名称
        position: 'right', // y 轴位置（右侧）
        offset: 80, // 相对第一个 y 轴的偏移量
        axisLine: {
          show: true, // 显示 y 轴的轴线
          lineStyle: {
            color: '#595EA5', // 轴线的颜色
          },
        },
        axisLabel: {
          formatter: '{value} hPa', // y 轴标签的格式化（显示毫巴）
        },
      },
    ],
    series: [
      {
        yAxisId: 'temperature',
        name: '温度',
        type: 'line', // 系列图表类型为折线图
        smooth: true, // 平滑曲线
        color: '#EE6666',
        data: temperatureData.value,
        markPoint: {
          data: [
            {
              type: 'max',
              name: 'Max',
            },
            {
              type: 'min',
              name: 'Min',
            },
          ],
        },
      },
      {
        yAxisId: 'precipitation',
        name: '降水量',
        type: 'line', // 系列图表类型为折线图
        smooth: true, // 平滑曲线
        color: '#91CC75',
        data: precipitationData.value,
      },
      {
        yAxisId: 'humidity',
        name: '相对湿度',
        type: 'line', // 系列图表类型为折线图
        smooth: true, // 平滑曲线
        color: '#9E4C47',
        data: humidityData.value,
      },
      {
        yAxisId: 'pressure',
        name: '气压',
        type: 'line', // 系列图表类型为折线图
        smooth: true, // 平滑曲线
        color: '#595EA5',
        data: pressureData.value,
      },
    ],
  }
})
</script>

<template>
  <VueEcharts
    :option="option"
    :height="500"
  />
</template>

<style lang="less" scoped></style>
