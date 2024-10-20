<script lang="ts" setup>
import type { EChartsOption } from 'echarts'
import chinaMap from '@/assets/jsons/china.json'
import { registerMap } from 'echarts/core'
import { ref } from 'vue'

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

  textStyle: {

    fontFamily: 'gaiLiangShouJinTi',

  },
  backgroundColor: 'transparent', // 透明

  /**
   *  标题设置
   */
  title: {
    /**
     *  标题文本
     */
    text: '风里雨里,长沙等你',

    /**
     *  标题距离顶部的距离
     */
    top: '5%',

    /**
     *  标题水平居中
     */
    left: 'center',

    textStyle: {

      color: '#d1d3d7',

      fontSize: 24,

      fontWeight: 700,
    },
  },

  /**
   *  地理区域配置
   */
  geo: {
    /**
     *  注册地图
     */
    map: 'china',

    /**
     *  地图缩放级别
     */
    zoom: 0.8,

    /**
     *  地图距顶部的距离
     */
    top: '0%',

    /**
     *  地图距底部的距离
     */
    bottom: '5%',

    /**
     *  地图区域的多边形 图形样式
     */
    itemStyle: {
      /**
       *  地图区域的颜色
       */
      areaColor: '#D8D5CA',

      /**
       *  描边颜色
       */
      borderColor: '#111',

    },

    /**
     *   鼠标悬停时的区域颜色
     */
    emphasis: {

      label: {
        show: false,
      },
      itemStyle: {
        /**
         *  鼠标悬停时的区域颜色
         */
        areaColor: '#323639',

        /**
         *  高亮状态下的描边颜色
         */
        borderColor: '#fff',

        /**
         *  高亮状态下的描边宽度
         */
        borderWidth: 1,

        /**
         *  高亮状态下的阴影模糊大小
         */
        shadowBlur: 2,
      },
    },

  },

  /**
   *  鼠标移到图里面的浮动提示框
   */
  tooltip: {
    /**
     *  提示框背景色
     */
    backgroundColor: 'rgba(0,0,0,0.5)',
    /**
     *  边框颜色
     */
    borderColor: 'rgba(0,0,0,0)',

    textStyle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 700,
    },
  },

  // 数据系列
  series: [
    {
      name: 'Top 5', // 前5名系列名称

      /**
       *  带有涟漪特效的散点图
       */
      type: 'effectScatter',
      /**
       *  使用地理坐标系
       */
      coordinateSystem: 'geo',

      /**
       *  排序后取前5名的数据s
       */
      data: convertData(data.sort((a, b) => b.value - a.value).slice(0, 6)),

      /**
       *  动态设置散点大小
       */
      symbolSize: (val: number[]) => val[2] / 8,
      /**
       *  渲染时显示特效
       */
      showEffectOn: 'render',

      /**
       *  涟漪特效相关配置
       */
      rippleEffect: {

        /**
         *  波纹的数量
         */
        number: 5,

        /**
         *  动画中波纹的最大缩放比例
         */
        scale: 20,

        /**
         *  动画的周期，秒数
         */
        period: 5,

        /**
         *  波纹的绘制方式
         */
        brushType: 'stroke',
      },

      emphasis: {
        /**
         *  鼠标悬停时放大效果
         */
        scale: true,
      },

      tooltip: {
        formatter() {
          return `惟楚有材，于斯为盛`
          // return `风里雨里,长沙等你`
        },
        textStyle: {
          color: '#E43961',
          fontSize: 16,
          fontWeight: 700,
        },

        backgroundColor: 'rgba(255,255,255,0.9)',

      },

      label: {
        /**
         *  标注的名称   长沙
         */
        formatter: (params) => {
          // return `${params.name}`
          return `${params.name}`
        },
        /**
         *  标注位置
         */
        position: 'top',
        /**
         *  显示标注
         */
        show: true,

        color: '#E43961',

        fontWeight: 700,

        fontSize: 24,
      },

      itemStyle: {

        /**
         *  散点颜色
         */
        color: '#E43961',

        /**
         *  阴影模糊程度
         */
        shadowBlur: 10,
        /**
         *  阴影颜色
         */
        shadowColor: '#333',

      },

      zlevel: 1, // 图层级别
    },
  ],
})

registerMap('china', chinaMap as any)
</script>

<template>
  <Chart
    :option="option"
  />
</template>

<style lang="less" scoped>
</style>
