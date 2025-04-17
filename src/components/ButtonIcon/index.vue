<script setup lang="ts">
import type { Placement } from 'element-plus'

import { twMerge } from 'tailwind-merge'

defineOptions({
  name: 'ButtonIcon',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  class: '',
  icon: '',
  tooltipContent: '',
  tooltipPlacement: 'bottom',
  zIndex: 98,
})

type Props = {

  /** 按钮的 class 类名 */
  class?: string

  /** Iconify 图标名称 */
  icon?: string

  /** 提示框内容 */
  tooltipContent?: string

  /** 提示框位置 */
  tooltipPlacement?: Placement

  /** 层级 z-index 值 */
  zIndex?: number
}

const DEFAULT_CLASS = '!h-[40px] !w-[40px] text-icon'
</script>

<template>
  <ElTooltip
    :placement="tooltipPlacement"
    :content="tooltipContent"
    :z-index="zIndex"
    :disabled="!tooltipContent"
  >
    <ElButton
      text
      quaternary
      :class="twMerge(DEFAULT_CLASS, props.class)"
      v-bind="$attrs"
    >
      <div
        class="flex items-center justify-center gap-[8px] text-lg"
      >
        <slot>
          <SvgIcon
            :icon="icon"
            :size="24"
          />
        </slot>
      </div>
    </ElButton>
  </ElTooltip>
</template>

<style scoped></style>
