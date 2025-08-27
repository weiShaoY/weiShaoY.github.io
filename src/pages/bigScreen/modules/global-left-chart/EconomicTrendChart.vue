<script setup>
import * as echarts from 'echarts'

import VChart from 'vue-echarts'

import { mCard } from '../../comments'

const option = ref({
  title: {
    text: '趋势',
    left: '5%',
    top: '8%',
    textStyle: {
      color: '#D3F8F2',
      fontSize: 8,
    },
  },
  grid: {
    left: '12%',
    top: '25%',
    width: '82%',
    height: '55%',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        opacity: 0.2,
      },
    },
    backgroundColor: 'rgba(0,0,0,1)',
    borderWidth: 1,
    borderColor: '#999999',
    textStyle: {
      color: '#ffffff',
      fontSize: 10,
    },
  },
  color: ['#6BC7F6'],
  xAxis: [
    {
      type: 'category',

      axisLine: {
        show: false,
        lineStyle: {
          color: '#435459',
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: '#ffffff',
        fontSize: 10,
        interval: 1,
        padding: [0, 0, 0, 0],
      },
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    },
    {
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(0,0,0,0)',
        },
      },
      data: [],
    },
  ],
  yAxis: {
    type: 'value',
    interval: 20,
    min: 0, // 从 0 开始
    max: 100, // 略高于最大值 21

    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: [2, 2],
        dashOffset: 5,
        color: ['rgba(255, 255, 255, 1)'],
        opacity: 1,
        width: 0.3,
      },
    },
    axisLabel: {
      color: '#8B9EA4',
      fontSize: 9,
    },
  },
  series: [
    {
      data: [50, 10, 30, 30, 50, 33, 62, 40],
      type: 'line',
      smooth: true,
      symbol:
        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAQ5JREFUOE+1la1OQ0EQRs8kCFIQdVCCxIBpCK1AInkDHC+B4QkwvASub4GsaE0NGCRpKhGFVDQZ+Mjem9vNbkphmWTMfjNnd3b2x0iYuxuwH7wNbIewBfAGzORm5nG6ElfM3QU6AXZSkzXG3oEnMxO8thWgux8DR2tAsfxiZs/VYA38Jazi1NBvYCizv+HK4vCRyrfQgIsf7Nm6+bSnjwIeAGeZaGnXQDfoE+ABmGbixwKeAoeJAMHuv3w30ubATQb6KqDKjZPEuAXOMysZAncJbS7gJbCVEAdAKwP8AK4S2vJfgMVLLt6UDtAreWx0W8od7OJXryq16OPwR2j6+WpAyz2wDagape7vARt9AZ+G3HmhiKS3xwAAAABJRU5ErkJggg==',
      symbolSize: 10,
      showSymbol: false, // 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
      yAxisIndex: 0,
      z: 0,

      // 设置高亮样式
      emphasis: {
        focus: 'none',
        itemStyle: {
          color: 'white',
        },
      },
      label: {
        show: true,
        position: 'top',
        distance: 10,
        color: '#ffffff',
        fontSize: 10,
      },

      lineStyle: {
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        shadowBlur: 3,
        shadowOffsetY: 10,
        width: 3,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(115, 208, 255, 1)',
          },
          {
            offset: 1,
            color: 'rgba(18,60,98,1)',
          },
        ]),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(25, 255, 236, 0.4)',
          },
          {
            color: 'rgba(51, 153, 255, 0)',
            offset: 1,
          },
        ]),
      },
    },
  ],
})

</script>

<template>
  <div
    class="left-card mb-3 flex-1"
  >
    <m-card
      title="预警信息响应时间趋势"
    >
      <VChart
        :option="option"
        :autoresize="true"
      />
    </m-card>
  </div>
</template>

<style lang="scss"></style>
