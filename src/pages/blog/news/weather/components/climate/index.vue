<script lang="ts" setup>
import type { EChartsOption } from 'echarts'

import type { WeatherType } from '../../types'

const data = defineModel<WeatherType>({
  required: true,
})

/**
 *  提取最高温度数据
 */
const maxTempData = computed(() =>
  data.value.climate.month.map(item => item.maxTemp),
)

/**
 *  提取最低温度数据
 */
const minTempData = computed(() =>
  data.value.climate.month.map(item => item.minTemp),
)

/**
 *  提取降水量数据
 */
const precipitationData = computed(() =>
  data.value.climate.month.map(item => item.precipitation),
)

const option = computed<EChartsOption>(() => {
  return {
    title: {
      text: `${data.value.climate.time} 月平均气温和降水`,
      textStyle: {
        fontFamily: 'gaiLiangShouJinTi',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'axis', // 提示框触发方式，'axis' 表示触发坐标轴
      axisPointer: {
        type: 'cross', // 坐标轴指示器的类型，'cross' 交叉线
      },

      formatter: (params: any) => {
        let relVal = params[0].name

        for (let i = 0, l = params.length; i < l; i++) {
          // 后缀
          const suffix = params[i].seriesName === '降水量' ? 'mm' : '°C'

          relVal += `<br/>${params[i].marker}${params[i].seriesName}     ${params[i].value}${suffix}`
        }

        return relVal
      },
    },
    grid: {
      right: '10%', // 网格右边的空白区域
    },
    toolbox: {
      feature: {
        saveAsImage: {
          show: true,
          title: '保存为图片',
        }, // 保存为图片功能，显示并能保存图表为图片
      },
    },
    legend: {
      data: ['最高温度', '最低温度', '降水量'], // 图例显示的名称
    },
    xAxis: [
      {
        type: 'category', // x 轴类型为类目轴
        axisTick: {
          alignWithLabel: true, // 刻度线是否与标签对齐
        },

        // x 轴的类目数据（月份）
        data: [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月',
        ],
      },
    ],

    // y 轴配置
    yAxis: [
      {
        id: 'temperature',
        type: 'value', // 第三个 y 轴类型为值轴
        name: '温度', // y 轴名称
        position: 'left', // y 轴的位置（左侧）
        alignTicks: true, // 是否与坐标轴对齐
        axisLine: {
          show: true, // 显示 y 轴的轴线
          lineStyle: {
            color: '#EE6666',
          },
        },
        axisLabel: {
          formatter: '{value} °C', // y 轴标签的格式化（显示摄氏度）
        },
      },

      {
        id: 'precipitation',
        type: 'value', // 第二个 y 轴类型为值轴
        name: '降水量', // y 轴名称
        position: 'right', // y 轴位置（右侧）
        alignTicks: true, // 是否与坐标轴对齐
        // offset: 80, // 相对第一个 y 轴的偏移量
        axisLine: {
          show: true, // 显示 y 轴的轴线
          lineStyle: {
            color: '#91CC75',
          },
        },
        axisLabel: {
          formatter: '{value} mm', // y 轴标签的格式化（显示毫米）
        },
      },
    ],

    series: [
      {
        yAxisId: 'temperature', // 使用第1个 y 轴
        name: '最高温度', // 系列名称
        type: 'line', // 系列图表类型为折线图
        smooth: true,
        color: '#EE6666', // 折线图的颜色
        data: maxTempData.value,
      },
      {
        yAxisId: 'temperature', // 使用第1个 y 轴
        name: '最低温度', // 系列名称
        type: 'line', // 系列图表类型为折线图
        smooth: true,
        color: '#5470C6', // 折线图的颜色
        data: minTempData.value,
      },
      {
        yAxisId: 'precipitation', // 使用第2个 y 轴
        name: '降水量', // 系列名称
        type: 'bar', // 系列图表类型为条形图
        color: '#91CC75', // 条形图的颜色
        data: precipitationData.value,
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
