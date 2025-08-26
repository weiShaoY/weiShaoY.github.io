<script setup lang="ts">

import * as echarts from 'echarts'

import VChart from 'vue-echarts'

import img_pieMidCircle from '@/assets/images/bigScreen/pie-mid-circle.png'

import img_pieZsBg from '@/assets/images/bigScreen/pie-zs-bg.png'

import { mCard } from '../../comments'

const state = reactive({
  pieDataColor: ['#17E6C3', '#40CFFF', '#1979FF', '#FFC472'],
  pieData: [
    {
      name: '类型1',
      value: 40,
    },
    {
      name: '类型2',
      value: 25,
    },
    {
      name: '类型3',
      value: 20,
    },
    {
      name: '类型4',
      value: 15,
    },
  ],
})

const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        opacity: 0,
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

  series: [
    {
      name: '',
      type: 'pie',
      itemStyle: {
        borderWidth: 5,
        borderColor: 'rgba(26, 57, 77,1)',
      },
      label: {
        show: false,
      },
      radius: ['55%', '70%'],
      color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],

      data: [
        {
          value: 40,
          name: '类型1',
          itemStyle: {
            // 颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              {
                offset: 0,
                color: 'rgba(3,65,128,1)',
              },
              {
                offset: 1,
                color: 'rgba(115,208,255,1)',
              },
            ]),
          },
        },
        {
          value: 25,
          name: '类型2',
          itemStyle: {
            // 颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              {
                offset: 0,
                color: 'rgba(11, 77, 44, 1)',
              },
              {
                offset: 1,
                color: 'rgba(77, 255, 181, 1)',
              },
            ]),
          },
        },
        {
          value: 20,
          name: '类型3',
          itemStyle: {
            // 颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              {
                offset: 0,
                color: 'rgba(117, 117, 117, 1)',
              },
              {
                offset: 1,
                color: 'rgba(230, 230, 230, 1)',
              },
            ]),
          },
        },
        {
          value: 15,
          name: '类型4',
          itemStyle: {
            // 颜色渐变
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              {
                offset: 0,
                color: 'rgba(153, 105, 38, 1)',
              },
              {
                offset: 1,
                color: 'rgba(255, 200, 89, 1)',
              },
            ]),
          },
        },
      ],
    },
  ],
})

</script>

<template>
  <div
    class="right-card mb-3 flex-1"
  >
    <m-card
      title="人群消费占比"
    >
      <div
        class="population-proportion h-full flex"
      >
        <div
          class="population-proportion-chart relative ml-4 h-full w-45 bg-cover bg-no-repeat"
          :style="{
            backgroundImage: `url(${img_pieZsBg})`,
          }"
        >
          <div
            class="absolute left-1/2 top-1/2 z-[-1] h-[72px] w-[72px] bg-cover content-[''] -ml-9 -mt-9"
            aria-hidden="true"
            :style="{
              backgroundImage: `url(${img_pieMidCircle})`,
              animation: 'rotate360Animate 2s linear infinite',
            }"
          />

          <VChart
            :option="option"
            :autoresize="true"
          />

          <div
            class="label-name absolute left-1/2 top-1/2 h-18 w-18 flex items-center justify-center text-xs text-[#c4e3fd] -ml-9 -mt-9"
          >
            消费占比
          </div>
        </div>

        <div
          class="pie-legend flex flex-col flex-wrap items-center justify-between py-5 pl-8"
        >
          <div
            v-for="(item, index) in state.pieData"
            :key="index"
            class="pie-legend-item box-border flex flex-nowrap items-center"
          >
            <div
              class="icon mr-2.5 box-border h-2.5 w-2.5 border-2 border-[#17e6c3] rounded-3 border-solid"
              :style="{ borderColor: state.pieDataColor[index] }"
            />

            <div
              class="name text-xs text-white font-medium"
            >
              {{ item.name }}
            </div>

            <div
              class="value w-20 flex flex-nowrap items-end justify-end text-right text-base text-white font-bold"
            >
              <span>
                {{ item.value }}
              </span>

              <span
                class="unit pl-3 text-xs text-white font-normal opacity-50"
              >
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </m-card>
  </div>
</template>

<style lang="scss">

</style>
