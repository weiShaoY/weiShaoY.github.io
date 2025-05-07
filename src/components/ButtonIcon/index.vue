<script lang="ts" setup>
import type { Placement } from 'element-plus'

import type { CSSProperties } from 'vue'

// 定义组件选项
defineOptions({
  name: 'BaseButton',
  inheritAttrs: false,
})

// 定义 Props 并设置默认值
const props = withDefaults(defineProps<PropsType>(), {
  class: '',
  icon: '',
  size: 40,
  tooltipContent: '',
  tooltipPlacement: 'bottom',
  loading: false,
})

// 定义组件事件
defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// 定义组件的 Props 类型
type PropsType = {

  /**
   * 按钮的 class 类名
   */
  class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>

  /**
   * 图标名称
   */
  icon?: string

  /**
   * 图标大小
   */
  size?: number

  /**
   * 图标额外的 class
   */
  iconClass?: string | Record<string, boolean> | Array<string | Record<string, boolean>>

  /**
   * 提示框内容
   */
  tooltipContent?: string

  /**
   * 提示框位置
   */
  tooltipPlacement?: Placement

  /**
   * 层级 z-index
   */
  zIndex?: number

  /**
   * 行内样式
   */
  style?: CSSProperties

  /**
   * 是否显示加载中
   */
  loading?: boolean
}

</script>

<template>
  <BaseButton
    v-bind="$attrs"
    :class="props.class"
    :icon="props.icon"
    :icon-class="props.iconClass"
    :size="props.size"
    :tooltip-content="props.tooltipContent"
    :tooltip-placement="props.tooltipPlacement"
    :z-index="props.zIndex"
    :style="props.style"
    :loading="props.loading"
    @click="$emit('click', $event)"
  />
</template>
