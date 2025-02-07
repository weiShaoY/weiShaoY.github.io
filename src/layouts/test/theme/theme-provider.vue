<script lang="ts" setup>
import type { PropType, VNode } from 'vue' // 导入 PropType 和 VNode 类型

import type { UILibraryAdapter } from './type' // 导入 UILibraryAdapter 类型

import { useTestStore } from '@/store' // 导入 useTestStore 钩子

import {
  h,
  onMounted,
  ref,
  watch,
} from 'vue' // 从 Vue 中导入 ref、watch、onMounted 和 h 函数

import { ThemeMode } from '../types/enum' // 导入枚举类型 ThemeMode

import { layoutClass } from './layout.css' // 导入布局样式

import { presetsColors } from './tokens/color' // 导入颜色预设

import { hexToRgbChannel, rgbAlpha } from './utils/theme' // 导入颜色转换函数

// 定义组件的 props
const props = defineProps({
  /**
   * 子组件节点
   * @type {VNode}
   */
  children: {
    type: Object as PropType<VNode>,
    required: true,
  },

  /**
   * 可选的 UI 库适配器数组
   * @type {Array<UILibraryAdapter>}
   */
  adapters: {
    type: Array as PropType<UILibraryAdapter[]>, // 使用 PropType 来定义类型
    default: () => [],
  },
})

const testStore = useTestStore() // 获取 store 实例

const { themeMode, themeColorPresets, fontFamily, fontSize } = testStore.settings // 从 store 中获取设置

// 监听 themeMode 改变
watch(
  () => themeMode,
  (newMode) => {
    const root = window.document.documentElement // 获取根 HTML 元素

    root.classList.remove(ThemeMode.Light, ThemeMode.Dark) // 移除旧的主题模式类
    root.classList.add(newMode) // 添加新的主题模式类
  },
  {
    immediate: true,
  },
)

// 监听 themeColorPresets 改变
watch(
  () => themeColorPresets,
  (newPresets) => {
    const root = document.documentElement // 获取根 HTML 元素

    const primaryColors = presetsColors[newPresets] // 获取当前颜色预设的主色调

    for (const [key, value] of Object.entries(primaryColors)) {
      root.style.setProperty(`--colors-palette-primary-${key}`, value) // 设置 CSS 变量
      root.style.setProperty(`--colors-palette-primary-${key}Channel`, hexToRgbChannel(value)) // 设置 RGB 通道 CSS 变量
    }

    root.style.setProperty('--shadows-primary', `box-shadow: 0 8px 16px 0 ${rgbAlpha(primaryColors.default, 0.24)}`) // 设置阴影 CSS 变量
  },
  {
    immediate: true,
  },
)

// 监听 fontFamily 和 fontSize 改变
watch(
  () => [fontFamily, fontSize],
  ([newFontFamily, newFontSize]) => {
    const root = document.documentElement // 获取根 HTML 元素

    root.style.fontSize = `${newFontSize}px` // 设置字体大小
    const body = document.body // 获取 body 元素

    body.style.fontFamily = newFontFamily as string // 设置字体族
  },
  {
    immediate: true,
  },
)

// 初始化时包裹子组件
const wrappedWithAdapters = ref<VNode>(props.children)

onMounted(() => {
  if (props.adapters && props.adapters.length > 0) {
    wrappedWithAdapters.value = props.adapters.reduce((acc, Adapter) => {
      return h(
        Adapter,
        {
          key: Adapter.name,
          mode: themeMode,
        },
        {
          default: () => acc,
        },
      )
    }, props.children)
  }
})
</script>

<template>
  <div
    :class="layoutClass"
  >
    <slot />
  </div>
</template>

<style lang="less" scoped>
/* 样式定义可以放在这里 */
</style>
