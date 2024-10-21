<!------------------------------------  图标组件  ------------------------------------------------->
<script lang="ts" setup>
import type { EChartsOption } from 'echarts'

import { nextTick, ref } from 'vue'

import VCharts from 'vue-echarts'

import 'echarts'

// const props = defineProps({

//   /**
//    *  配置
//    */
//   option: {
//     // type: Object as PropType<EChartsOption>,
//     type: Object as unknown as EChartsOption,
//   },

//   /**
//    *  自适应
//    */
//   autoResize: {
//     type: Boolean,
//     default: true,
//   },

//   /**
//    *  宽
//    */
//   width: {
//     type: String,
//     default: '100%',
//   },

//   /**
//    *  高
//    */
//   height: {
//     type: String,
//     default: '100%',
//   },
// })

withDefaults(defineProps<{
  /**
   *  配置
   */
  option: EChartsOption
  /**
   *  自适应
   */
  autoResize?: boolean
  /**
   *  宽
   */
  width?: string
  /**
   *  高
   */
  height?: string
}>(), {
  autoResize: true,
  width: '100%',
  height: '100%',
})
const renderChart = ref(true)

nextTick(() => {
  renderChart.value = false
})
</script>

<template>
  <VCharts
    :option="option"
    :autoresize="autoResize"
    :style="{ width, height }"
    :loading="renderChart"
  />
</template>

<style scoped lang="less"></style>
