<script lang="ts" setup>

import { computed } from 'vue'

defineOptions({
  name: 'MenuToggler',
})

const props = withDefaults(defineProps<Props>(), {
  arrowIcon: false,
  zIndex: 98,
})

type Props = {

  /** 是否显示折叠图标 */
  collapsed?: boolean

  /** 是否使用箭头样式图标 */
  arrowIcon?: boolean

  /** 层级 z-index 值 */
  zIndex?: number
}

/**
 * 数字布尔类型
 * 0 表示 false
 * 1 表示 true
 */
type NumberBool = 0 | 1

/**
 *  计算当前应该显示的图标
 */
const icon = computed(() => {
  // 图标映射表 [箭头图标状态][折叠状态] => 图标名称
  const icons: Record<NumberBool, Record<NumberBool, string>> = {
    0: { // 非箭头图标状态
      0: 'arrow-left', // 未折叠状态图标
      1: 'arrow-right', // 折叠状态图标
    },
    1: { // 箭头图标状态
      0: 'arrow-left', // 未折叠状态图标
      1: 'arrow-right', // 折叠状态图标
    },
  }

  // 将 props 转换为 NumberBool 类型
  const arrowIcon = Number(props.arrowIcon || false) as NumberBool

  const collapsed = Number(props.collapsed || false) as NumberBool

  return icons[arrowIcon][collapsed]
})
</script>

<template>
  <ButtonIcon
    :key="String(collapsed)"
    :tooltip-content="collapsed ? '展开菜单' : '折叠菜单'"
    tooltip-placement="bottom-start"
    :z-index="zIndex"
  >
    <SvgIcon
      :icon="icon"
    />
  </ButtonIcon>
</template>

<style scoped></style>
