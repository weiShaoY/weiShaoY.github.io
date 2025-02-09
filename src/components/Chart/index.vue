<!------------------------------------  图标组件  ------------------------------------------------->
<script lang="ts" setup>
import type { EChartsOption } from 'echarts'

import VCharts from 'vue-echarts'

import 'echarts'

defineProps({

  /**
   *  颜色
   */
  option: {
    type: Object as () => EChartsOption,
    required: true,
  },

  /**
   *  大小
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

</script>

<template>
  <VCharts
    :option="option"
    :autoresize="autoResize"
    :style="{ width, height }"
  />
</template>

<style scoped lang="less"></style>
