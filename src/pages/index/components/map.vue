<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import chinaMap from '@/assets/json/china.json'
import { registerMap } from 'echarts/core'
import { ref } from 'vue'

// 注册地图与主题
// provide(THEME_KEY, 'macarons')

/**
 *  定义数据和地理坐标
 */
const data = [
  { name: '长沙', value: 100 },
]

/**
 *  定义城市名称与经纬度对应的映射
 */
const geoCoordMap: Record<string, [number, number]> = {
  长沙: [113, 28.21],
}

/**
 * 转换数据格式，结合地理坐标和数值
 * @param data - 包含城市名称和数值的数据数组
 * @returns 转换后的数据数组，包含城市名称、坐标和数值
 */
function convertData(data: { name: string, value: number }[]): { name: string, value: [number, number, number] }[] {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value),
      })
    }
  }
  return res as { name: string, value: [number, number, number] }[]
}

/**
 *  定义 ECharts 配置项并添加类型注释
 */
const option = ref<EChartsOption>({
  // 全局字体样式
  textStyle: {
    fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif', // 字体系列
    fontWeight: 300, // 字体粗细
  },
  // 背景颜色（已注释）
  // backgroundColor: '#404a59',

  // 标题设置
  title: {
    text: '风里雨里,长沙等你', // 标题文本
    // subtext: 'data from PM25.in', // 副标题文本（已注释）
    top: '5%', // 标题距离顶部的距离
    left: 'center', // 标题水平居中
    textStyle: {
      color: '#fff', // 标题文字颜色
    },
  },

  // 提示框配置
  tooltip: {
    trigger: 'item', // 触发类型为数据项
  },

  // 图例配置
  // legend: {
  //   orient: 'vertical', // 图例布局方向为垂直
  //   right: '5%', // 图例距右边的距离
  //   bottom: '5%', // 图例距底部的距离
  //   data: ['PM2.5'], // 图例项
  //   textStyle: {
  //     color: '#fff', // 图例文字颜色
  //   },
  // },

  // 地理区域配置
  geo: {
    map: 'china', // 地图类型为中国地图
    emphasis: {
      label: {
        show: true, // 鼠标悬停时不显示标签
      },
      itemStyle: {
        areaColor: '#2a333d', // 鼠标悬停时的区域颜色
      },
    },
    itemStyle: {
      // 普通状态下的区域颜色
      // areaColor: '#323c48',
      areaColor: '#D8D5CA', // 替换后的区域颜色
      borderColor: '#111', // 区域边界颜色
    },
    top: '20%', // 地图距顶部的距离
    bottom: '7%', // 地图距底部的距离
  },

  // 数据系列
  series: [
    {
      name: 'PM2.5', // 系列名称
      type: 'scatter', // 散点图类型
      coordinateSystem: 'geo', // 使用地理坐标系
      data: convertData(data), // 转换后的数据
      symbolSize: (val: number[]) => val[2] / 10, // 根据数值动态设置散点大小
      tooltip: {
        triggerOn: false,

        // 鼠标悬停时的提示框内容格式
        // formatter: (val: { name: string, value: number[] }) => `${val.name}: ${val.value[2]}`,
      },
      itemStyle: {
        color: '#ddb926', // 散点颜色
      },
    },
    {
      name: 'Top 5', // 前5名系列名称
      type: 'effectScatter', // 带有涟漪特效的散点图
      coordinateSystem: 'geo', // 使用地理坐标系
      data: convertData(data.sort((a, b) => b.value - a.value).slice(0, 6)), // 排序后取前5名的数据
      symbolSize: (val: number[]) => val[2] / 10, // 动态设置散点大小
      showEffectOn: 'render', // 渲染时显示特效
      rippleEffect: {
        brushType: 'stroke', // 涟漪特效的类型为描边
      },
      emphasis: {
        scale: true, // 鼠标悬停时放大效果
      },
      tooltip: {
        show: false,
      },
      label: {
        formatter: '{b}', // 显示标注的名称
        position: 'right', // 标注位置在右侧
        show: true, // 显示标注
      },
      itemStyle: {
        color: '#f4e925', // 散点颜色
        shadowBlur: 10, // 阴影模糊程度
        shadowColor: '#333', // 阴影颜色
      },
      zlevel: 1, // 图层级别
    },
  ] as EChartsOption['series'],
}) as any

registerMap('china', chinaMap as any)
</script>

<template>
  <Chart
    :option="option"
    height="500px"
  />
</template>

<style lang="less" scoped>
</style>
