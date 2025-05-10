<!------------------------------------  图标组件  ------------------------------------------------->
<script lang="ts" setup>
import type { EChartsOption } from 'echarts'

import type { CSSProperties } from 'vue'

import VCharts from 'vue-echarts'

import 'echarts'

type ChartPropsType = {

  /**
   *  配置
   */
  option: EChartsOption

  /**
   *  是否自动调整大小
   */
  isAutoResize?: boolean

  /**
   *  是否显示 loading
   */
  isLoading?: boolean

  /**
   *  宽
   */
  width?: string | number

  /**
   *  高
   */
  height?: string | number

}

const props = withDefaults(defineProps<ChartPropsType>(), {
  isAutoResize: true,
  isLoading: false,
  width: '100%',
  height: '100%',
})

const loadingOptions = {
  text: '加载中...',
  fontSize: 20,
  fontFamily: 'gaiLiangShouJinTi',
  color: '#E43961',
  textColor: '#000',
}

const computedStyle = computed<CSSProperties>(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))

</script>

<template>
  <VCharts
    :option="option"
    :autoresize="isAutoResize"
    :style="computedStyle"
    :loading="isLoading"
    :loading-options="loadingOptions"
  />
</template>
