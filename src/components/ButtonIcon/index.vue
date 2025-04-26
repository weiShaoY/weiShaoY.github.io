<script setup lang="ts">

import type { PopupPlacement } from 'tdesign-vue-next'

import type { CSSProperties } from 'vue'

import { twMerge } from 'tailwind-merge'

defineOptions({
  name: 'ButtonIcon',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  class: '',
  icon: '',
  size: 40,
  tooltipContent: '',
  tooltipPlacement: 'bottom',
  loading: false,
})

defineEmits(['click'])

type Props = {

  /** 按钮的 class 类名 */
  class?:
    | string
    | Record<string, boolean>
    | Array<string | Record<string, boolean>>

  /** 图标名称 */
  icon?: string

  /** 图标大小 */
  size?: number

  /**
   *  图标 class
   */
  iconClass?:
    | string
    | Record<string, boolean>
    | Array<string | Record<string, boolean>>

  /** 提示框内容 */
  tooltipContent?: string

  /** 提示框位置 */
  tooltipPlacement?: PopupPlacement

  /** 层级 z-index 值 */
  zIndex?: number

  /** 行内样式 */
  style?: CSSProperties

  /**
   *  加载loading
   */
  loading?: boolean
}

const DEFAULT_CLASS = 'flex items-center justify-center'

/**
 * 计算合并后按钮的类名
 * 现在支持字符串、对象和数组形式的class
 */
const computedButtonClass = computed(() => {
  // 处理对象或数组形式的class
  if (typeof props.class !== 'string') {
    return twMerge(DEFAULT_CLASS)
  }

  return twMerge(DEFAULT_CLASS, props.class)
})

/**
 *  处理动态class对象
 */
const dynamicButtonClass = computed(() => {
  if (typeof props.class === 'object') {
    return props.class
  }

  return {
  }
})

/**
 *  计算最终的样式
 */
const computedStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  ...props.style,
}))

/**
 *  计算图标的类名
 */
const computedIconClass = computed(() => {
  if (typeof props.iconClass === 'string') {
    return props.iconClass
  }

  return props.iconClass
})
</script>

<template>
  <div
    class=""
  >
    <t-tooltip
      class=""
      :content="tooltipContent"
      :placement="tooltipPlacement"
      show-arrow
    >
      <t-button
        variant="text"
        shape="square"
        class=""
        :class="[computedButtonClass, dynamicButtonClass]"
        :style="computedStyle"
        @click="$emit('click', $event)"
      >
        <template
          #icon
        >
          <slot>
            <SvgIcon
              v-if="!loading"
              :icon="icon"
              :size="size - 14"
              :class="computedIconClass"
            />

            <Loading
              v-else
              :size="size - 14"
            />
          </slot>
        </template>
      </t-button>
    </t-tooltip>
  </div>
</template>

<style scoped></style>
