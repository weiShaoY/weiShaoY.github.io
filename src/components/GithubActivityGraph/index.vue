<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import { computed } from 'vue'

/**
 * 组件 Props
 */
type PropsType = {

  /**
   * 图片高度，支持数值或字符串
   */
  height?: number | string

  /**
   * 图片宽度，支持数值或字符串
   */
  width?: number | string

  /**
   * 图片额外类名，支持字符串、数组或对象
   * @example "my-class"
   * @example ["class-a", "class-b"]
   * @example { active: true, disabled: false }
   */
  class?: string | string[] | Record<string, boolean>

  /**
   * 图片额外样式
   */
  style?: CSSProperties

}

/** 接收并设置默认 props */
const props = withDefaults(defineProps<PropsType>(), {
  width: '100%',
  height: '100%',
})

/** Github 活动图 API 地址 */
const GITHUB_ACTIVITY_GRAPH_URL = 'https://github-readme-activity-graph.vercel.app/graph'

/** 使用的主题 */
const THEME = 'react-dark'

/**
 * Github 活动图配置项
 * @see https://github.com/Ashutosh00710/github-readme-activity-graph#options
 */
const options = {
  username: 'weiShaoY',
  theme: THEME,
}

/**
 * 生成 Github 活动图的完整 URL
 * @returns {string} 图片地址
 */
const imageUrl = computed(() => {
  return `${GITHUB_ACTIVITY_GRAPH_URL}?${new URLSearchParams(options).toString()}`
})

/**
 * 计算图片样式
 * @returns {CSSProperties} 图片的 CSS 样式
 */
const computedImageStyle = computed<CSSProperties>(() => ({
  ...props.style,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
}))
</script>

<template>
  <img
    :class="props.class"
    :style="computedImageStyle"
    :src="imageUrl"
    alt="GitHub 活动图"
  >
</template>
