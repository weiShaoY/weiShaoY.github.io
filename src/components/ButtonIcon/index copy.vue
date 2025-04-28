<script setup lang="ts">
import type { Placement } from "element-plus";
import type { CSSProperties } from "vue";

import { twMerge } from "tailwind-merge";

defineOptions({
  name: "ButtonIcon",
  inheritAttrs: false,
});

type Props = {
  /** 按钮的 class 类名 */
  class?: string;

  /** Iconify 图标名称 */
  icon?: string;

  /** 提示框内容 */
  tooltipContent?: string;

  /** 提示框位置 */
  tooltipPlacement?: Placement;

  /** 层级 z-index 值 */
  zIndex?: number;

  /**
   * 行内样式
   */
  style?: CSSProperties;
};

const props = withDefaults(defineProps<Props>(), {
  class: "",
  icon: "",
  tooltipContent: "",
  tooltipPlacement: "bottom",
  zIndex: 98,
});

/**
 * 计算合并后的类名
 */
const computedClass = computed(() => `${props.class}`);

const computedStyle = computed(() => props.style);

const DEFAULT_CLASS = " text-icon";
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
        class="!h-[40px] !w-[40px] flex items-center justify-center gap-[8px] text-lg"
        :class="computedClass"
        :style="computedStyle"
      >
        <slot>
          <SvgIcon :icon="icon" :size="24" />
        </slot>
      </div>
    </ElButton>
  </ElTooltip>
</template>

<style scoped></style>
