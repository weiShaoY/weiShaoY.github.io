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
  class?:
    | string
    | Record<string, boolean>
    | Array<string | Record<string, boolean>>;

  /** 图标名称 */
  icon?: string;

  /** 图标大小 */
  iconSize?: number;

  /**
   *  图标 class
   */
  iconClass?:
    | string
    | Record<string, boolean>
    | Array<string | Record<string, boolean>>;

  /** 提示框内容 */
  tooltipContent?: string;

  /** 提示框位置 */
  tooltipPlacement?: Placement;

  /** 层级 z-index 值 */
  zIndex?: number;

  /** 行内样式 */
  style?: CSSProperties;
};

const props = withDefaults(defineProps<Props>(), {
  class: "",
  icon: "",
  iconSize: 24,

  tooltipContent: "",
  tooltipPlacement: "bottom",
  // zIndex: 98,
});

const DEFAULT_CLASS = "flex items-center justify-center";

/**
 * 计算合并后的类名
 * 现在支持字符串、对象和数组形式的class
 */
const computedButtonClass = computed(() => {
  // 处理对象或数组形式的class
  if (typeof props.class !== "string") {
    return twMerge(DEFAULT_CLASS);
  }
  return twMerge(DEFAULT_CLASS, props.class);
});

/**
 *  处理动态class对象
 */
const dynamicButtonClass = computed(() => {
  if (typeof props.class === "object") {
    return props.class;
  }
  return {};
});

const computedStyle = computed(() => ({
  width: `${props.iconSize + 12}px`,
  height: `${props.iconSize + 12}px`,
  ...props.style,
}));

// 处理图标的类名
const computedIconClass = computed(() => {
  if (typeof props.iconClass === "string") {
    return props.iconClass;
  }
  return props.iconClass;
});
</script>

<template>
  <div class="">
    <ElTooltip
      :placement="tooltipPlacement"
      :content="tooltipContent"
      :z-index="zIndex"
      :disabled="!tooltipContent"
    >
      <ElButton
        text
        quaternary
        class="!p-0 !h-auto"
        @click="$emit('click', $event)"
      >
        <div
          :class="[computedButtonClass, dynamicButtonClass]"
          :style="computedStyle"
        >
          <slot>
            <SvgIcon :icon="icon" :size="iconSize" :class="computedIconClass" />
          </slot>
        </div>
      </ElButton>
    </ElTooltip>
  </div>
</template>

<style scoped></style>
