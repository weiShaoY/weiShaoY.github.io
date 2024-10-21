<script setup lang="ts" name="svgIcon">
import { computed } from 'vue'

const props = defineProps({

  /**
   * @type {string}
   * @required
   * @description 图标icon名称
   */
  icon: {
    type: String,
    required: true,
  },

  /**
   * @type {string | number}
   * @default '16px'
   * @description 图标大小  默认16px  number or string
   */
  size: {
    type: [String, Number],
    default: '16px',
  },

  /**
   * @type {string}
   * @default ''
   * @description 图标class名 自定义class
   */
  class: {
    type: String,
    default: '',
  },

  /**
   * @type {string}
   * @default ''
   * @description 图标颜色
   */
  color: {
    type: String,
    default: '',
  },
})

/**
 * 图标icon名
 * @type {ComputedRef<string>}
 */
const iconClassName = computed(() => {
  return `#${props.icon}`
})

/**
 * 图标class名 自定义class
 * @type {ComputedRef<string>}
 */
const svgClass = computed(() => {
  if (props.class)
    return `svg-icon ${props.class}`

  return 'svg-icon'
})

/**
 * 图标大小
 * @type {ComputedRef<string>}
 */
const svgSize = computed(() => {
  // 如果传入的的是number类型，需要转换成string类型
  if (typeof props.size === 'number')
    return `${props.size}px`

  return props.size
})
</script>

<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    :font-size="svgSize"
  >
    <use
      :xlink:href="iconClassName"
      :fill="color"
    />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
}
</style>
