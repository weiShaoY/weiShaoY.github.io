<script setup lang="ts">
import type { EChartsOption } from 'echarts'

import chinaMapJson from '@/assets/jsons/chinaMap.json'

// 地图配置
const options: EChartsOption = {
  /**
   *  文字样式配置
   */
  textStyle: {
    fontFamily: 'gaiLiangShouJinTi', // 字体家族
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
    top: '12%', // 标题距离顶部的距离
    left: 'center', // 标题水平居中
    textStyle: {
      color: '#333639',
      fontSize: 35, // 标题字体大小
      fontWeight: 700, // 标题字体粗细
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

    formatter: (params: any) => params.name,
  },

  /**
   *  地理区域配置
   */
  geo: {
    map: 'china', // 地图类型
    zoom: 1, // 缩放级别
    show: true, // 是否显示地图
    roam: false, // 是否允许缩放和拖拽
    layoutSize: '100%', // 布局大小
    emphasis: {
      label: {
        show: true, // 高亮时是否显示标签
      },
    },
    itemStyle: {
      borderColor: 'rgba(255,255,255,0.5)',
      borderWidth: 1,
      areaColor: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(0,210,255,0.3)',
          },
          {
            offset: 1,
            color: 'rgba(0,120,255,0.8)',
          },
        ],
      },
      shadowColor: 'rgba(0,120,255,0.5)',
      shadowOffsetY: 10,
      shadowBlur: 15,
    },
  },

  /**
   *  数据系列
   */
  series: [
    {
      /**
       *  地图数据
       */
      type: 'map',
      map: 'china', // 地图类型
      aspectScale: 0.75, // 纵横比
      zoom: 1, // 缩放级别
      label: {
        // show: true, // 是否显示标签
        color: '#fff', // 标签颜色
        fontSize: 10, // 标签字体大小
      },
      itemStyle: {
        borderColor: 'rgba(255,255,255,0.5)',
        borderWidth: 1,
        areaColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(0,210,255,0.3)',
            },
            {
              offset: 1,
              color: 'rgba(0,120,255,0.8)',
            },
          ],
        },
        shadowColor: 'rgba(0,120,255,0.5)',
        shadowOffsetY: 10,
        shadowBlur: 15,
      },

      //  高亮时
      emphasis: {
        label: {
          show: true,
          color: '#fff',
        },
        itemStyle: {
          areaColor: 'rgba(0,210,255,0.9)',
          borderColor: '#fff',
          borderWidth: 2,
        },
      },

      /**
       *  选中区域的样式
       */
      select: {
        label: {
          show: true,
          color: '#fff',
        },
        itemStyle: {
          areaColor: 'rgba(0,210,255,1)',
          borderColor: '#fff',
          borderWidth: 2,
        },
      },
    },

    /**
     *  带有涟漪特效的散点图
     */
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
        formatter: () => '惟楚有材，于斯为盛',
        textStyle: {
          color: '#E43961',
          fontSize: 20,
          fontWeight: 700,
        },

        // 提示框背景色
        backgroundColor: 'rgba(255,255,255,0.5)',
      },

      label: {
        /**
         *  标注的名称   长沙
         */
        formatter: (params: any) => params.name,

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
        shadowColor: 'rgba(0,120,255,0.5)',
      },

      /**
       *  图层级别
       */
      zlevel: 1,
    },
  ],
}

function handleClick(params: any) {
  if (params.name === '长沙') {
    window.$notification?.success('风里雨里，长沙等你')
  }
}
</script>

<template>
  <div
    class="w-full"
    style="height: calc(100vh - 200px)"
  >
    <VueEcharts
      :option="options"
      :map-json="chinaMapJson"
      map-name="china"
      @click="handleClick"
    />
  </div>
</template>

<style lang="scss" scoped>
:deep(.echarts) {
  width: 100%;
  height: 100%;
}
</style>
