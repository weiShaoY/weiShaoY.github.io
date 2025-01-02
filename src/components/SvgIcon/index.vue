<script setup lang="ts">
/**
 * 组件属性类型定义
 */
const props = defineProps({
  /**
   * 图标的前缀
   */
  prefix: {
    type: String,
    default: 'icon',
  },

  /**
   * 图标的名称
   */
  icon: {
    type: String,
    required: true,
  },

  /**
   * 图标的颜色
   */
  color: {
    type: String,
    default: 'currentColor',
  },

  /**
   * 图标的大小
   */
  size: {
    type: [String, Number],
    default: '1em',
  },

  /**
   * 额外的 CSS 类名
   */
  class: {
    type: String,
    default: '',
  },

  /**
   * 行内样式
   */
  style: {
    type: Object,
    default: () => ({
    }),
  },
})

/**
 * 计算 `symbolId` 用于引用图标
 */
const symbolId = computed(() => `#${props.prefix}-${props.icon}`)

/**
 * 计算合并后的类名
 */
const mergedClassName = computed(() =>
  `${props.class} anticon fill-current inline-block h-[1em] w-[1em] overflow-hidden outline-none`,
)

/**
 * 计算 SVG 的行内样式
 */
const svgStyle = computed(() => ({
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
    :class="mergedClassName"
    :style="svgStyle"
    :aria-label="icon"
  >
    <title>{{ icon }}</title>

    <use
      :xlink:href="symbolId"
      fill="currentColor"
    />
  </svg>
</template>
