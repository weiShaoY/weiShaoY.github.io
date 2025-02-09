<script lang="ts" setup>
import type { EChartsOption } from 'echarts'

import chinaMap from '@/assets/jsons/china-map.json'

import { isMobile } from '@/utils'

import { registerMap } from 'echarts/core'

/**
 *  定义 ECharts 配置项并添加类型注释
 */

const option = computed<EChartsOption>(() => ({
  textStyle: {
    fontFamily: 'gaiLiangShouJinTi',
  },

  /**
   *  背景颜色
   */
  backgroundColor: 'transparent',

  /**
   *  标题设置
   */
  title: {

    text: '风里雨里,长沙等你', // 标题文本
    top: isMobile ? '12%' : '14%', // 标题距离顶部的距离
    left: 'center', // 标题水平居中
    textStyle: {
      // color: "#000", // 标题颜色
      color: '#333639',
      fontSize: isMobile ? 30 : 35, // 标题字体大小
      fontWeight: 700, // 标题字体粗细
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
    zoom: isMobile ? 0.8 : 0.8,

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
      areaColor: '#d1d3d7',

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

  /**
   *  数据系列
   */
  series: [
    {
      /**
       *  前5名系列名称
       */
      name: 'Top 5',

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
      data: [
        {
          name: '长沙', // 数据点名称
          value: [113, 28.21, 100], // 数据坐标（[经度, 纬度, 数值]）
        },
      ],

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
        // 风里雨里,长沙等你
        formatter() {
          return `惟楚有材，于斯为盛`
        },
        textStyle: {
          color: '#E43961',
          fontSize: 20,
          fontWeight: 700,
        },

        // 提示框背景色
        backgroundColor: 'rgba(255,255,255,0.9)',
      },

      label: {
        /**
         *  标注的名称   长沙
         */
        formatter: (params) => {
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

        fontSize: 26,
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

      /**
       *  图层级别
       */
      zlevel: 1,
    },
  ],
}))

registerMap('china', chinaMap as any)
</script>

<template>
  <Chart
    :option="option"
  />
</template>

<style lang="less" scoped></style>
