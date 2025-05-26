<script lang="ts" setup>
import type { WatermarkProps } from 'element-plus'

import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { computed } from 'vue'

import { useBlogStore } from './store'

/**
 * 组件名称
 */
defineOptions({
  name: 'App',
})



/**
 * 博客状态管理
 */
const blogStore = useBlogStore()

/**
 * 水印配置
 * @description 根据博客设置动态生成水印配置
 */
const watermarkProps = computed<WatermarkProps>(() => ({
  /**
   * 水印内容
   */
  content: blogStore.setting.watermark.isShow ? blogStore.setting.watermark.text : '',

  /**
   * 是否交叉显示
   */
  cross: true,

  /**
   * 字体大小
   */
  fontSize: 16,

  /**
   * 行高
   */
  lineHeight: 16,

  /**
   * 水印间距
   */
  gap: [100, 120] as [number, number],

  /**
   * 旋转角度
   */
  rotate: -15,

  /**
   * 层级
   */
  zIndex: 9999,
}))

</script>

<template>
  <ElConfigProvider
    :locale="zhCn"
  >
    <AppProvider>
      <ElWatermark
        class="h-full"
        v-bind="watermarkProps"
      >
        <RouterView />
      </ElWatermark>
    </AppProvider>
  </ElConfigProvider>
</template>
