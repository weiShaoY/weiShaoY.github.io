<script setup lang="ts">
import type { CSSProperties } from 'vue'

import { twMerge } from 'tailwind-merge'

type SvgIconPropsType = {

  /**
   * 图标的名称
   */
  icon: string

  /**
   * 图标的前缀
   */
  prefix?: string

  /**
   *  图标的颜色
   */
  color?: string

  /**
   * 图标的大小
   */
  size?: string | number

  /**
   *  额外的 CSS 类名
   */
  class?:
    | string
    | Record<string, boolean>
    | Array<string | Record<string, boolean>>

  /**
   * 行内样式
   */
  style?: CSSProperties
}

const props = withDefaults(defineProps<SvgIconPropsType>(), {
  prefix: 'icon',
  size: 24,
  color: 'currentColor',
})

/**
 * 计算 `symbolId` 用于引用图标
 */
const symbolId = computed(() => `#${props.prefix}-${props.icon}`)

/**
 * 基础类名
 */
const BASE_CLASSES = 'anticon fill-current inline-block h-[1em] w-[1em] overflow-hidden outline-none'

/**
 * 计算合并后的类名
 * 现在支持字符串、对象和数组形式的class
 */
const computedClass = computed(() => {
  // 处理字符串形式的class
  if (typeof props.class === 'string') {
    return twMerge(BASE_CLASSES, props.class)
  }

  // 处理对象或数组形式的class
  if (props.class) {
    return [BASE_CLASSES, props.class]
  }

  return BASE_CLASSES
})

/**
 * 计算 SVG 的行内样式
 */
const computedStyle = computed(() => ({
  verticalAlign: 'middle',
  width: props.size,
  height: props.size,
  color: props.color,
  ...props.style,
}))
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    :aria-label="icon"
    :class="computedClass"
    :style="computedStyle"
  >
    <title>{{ icon }}</title>

    <use
      :xlink:href="symbolId"
      fill="currentColor"
    />
  </svg>
</template>
