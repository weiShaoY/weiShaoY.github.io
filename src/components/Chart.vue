<script lang="ts" setup>
import type { EChartsOption } from 'echarts'

import { nextTick, ref } from 'vue'

import VCharts from 'vue-echarts'

import 'echarts'

defineProps({

  /**
   *  配置
   */
  options: {
    type: Object as () => EChartsOption,
    default() {
      return {}
    },
  },

  /**
   *  自适应
   */
  autoResize: {
    type: Boolean,
    default: true,
  },

  /**
   *  宽
   */
  width: {
    type: String,
    default: '100%',
  },

  /**
   *  高
   */
  height: {
    type: String,
    default: '100%',
  },
})

const renderChart = ref(false)

nextTick(() => {
  renderChart.value = true
})
</script>

<template>
  <VCharts
    v-if="renderChart"
    :option="options"
    :autoresize="autoResize"
    :style="{ width, height }"
  />
</template>

<style scoped lang="less"></style>
