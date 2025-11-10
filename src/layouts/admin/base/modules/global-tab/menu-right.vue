<!-- 右键菜单 -->
<script setup lang="ts">
import type { CSSProperties } from 'vue'

import { computed, ref } from 'vue'

/**
 * 菜单项类型定义
 */
export type MenuItemType = {

  /**
   *  菜单项唯一标识
   */
  key: string

  /**
   *  菜单项名称
   */
  label: string

  /**
   *  菜单项图标
   */
  icon?: string

  /**
   *  菜单项是否禁用
   */
  disabled?: boolean

  /**
   *  子菜单
   */
  children?: MenuItemType[]
  [key: string]: any
}

/**
 * 组件属性类型定义
 */
type Props = {

  /**
   * 菜单项数据数组
   */
  menuItems: MenuItemType[]
}

// 定义组件属性
defineProps<Props>()

/**
 * 组件事件定义
 * @property select - 菜单项选择事件
 * @param item - 被选中的菜单项对象
 */
const emit = defineEmits<{
  (e: 'select', item: MenuItemType): void
}>()

/**
 * 控制菜单显示/隐藏的响应式变量
 * @default false
 */
const visible = ref(false)

/**
 * 菜单位置坐标
 * @property x - 水平位置
 * @property y - 垂直位置
 */
const position = ref({
  x: 0,
  y: 0,
})

/**
 * 计算菜单样式
 * @returns  菜单定位样式对象
 */
const menuStyle = computed(
  (): CSSProperties => ({
    position: 'fixed' as const, // 固定定位
    left: `${position.value.x}px`, // 水平位置
    top: `${position.value.y}px`, // 垂直位置
    zIndex: 2000, // 确保菜单在最上层
  }),
)

/**
 * 显示上下文菜单
 * @param  e - 鼠标事件对象
 */
function show(e: MouseEvent) {
  e.preventDefault() // 阻止默认右键菜单
  // 设置菜单位置为鼠标点击位置
  position.value = {
    x: e.clientX,
    y: e.clientY,
  }
  visible.value = true // 显示菜单

  // 添加一次性点击事件监听器来关闭菜单
  document.addEventListener('click', hide, {
    once: true, // 只执行一次
  })
}

/**
 * 隐藏菜单
 */
function hide() {
  visible.value = false
}

/**
 * 处理菜单项点击事件
 * @param  item - 被点击的菜单项
 */
function handleMenuClick(item: MenuItemType) {
  if (item.disabled) {
    return // 如果菜单项被禁用则不处理
  }

  // 触发select事件
  emit('select', item)

  // 隐藏菜单
  hide()
}

/**
 * 菜单进入前的动画钩子函数
 * @param  el - 菜单DOM元素
 */
function onBeforeEnter(el: Element) {
  (el as HTMLElement).style.transformOrigin = 'top left' // 设置动画变换原点
}

/**
 * 菜单离开后的动画钩子函数
 * 可用于清理动画相关状态
 */
function onAfterLeave() {
  // 可以在这里添加退场后的清理逻辑
}

// 导出方法供父组件调用
defineExpose({
  show, // 显示菜单方法
  hide, // 隐藏菜单方法
})
</script>

<template>
  <div
    class="menu-right"
  >
    <Transition
      name="context-menu "
      @before-enter="onBeforeEnter"
      @after-leave="onAfterLeave"
    >
      <div
        v-show="visible"
        :style="menuStyle"
        class="context-menu 1 min-w-30 rounded-2 bg-[#fff] shadow-[0,0,0,0.12]"
      >
        <ul
          class="menu-list 1 m-0 list-none p-2"
        >
          <template
            v-for="item in menuItems"
            :key="item.key"
          >
            <!-- 普通菜单项 -->
            <li
              v-if="!item.children"
              class="menu-item relative h-8 flex cursor-pointer items-center rounded-1 px-2 color-[#303133] hover:bg-[rgba(241,241,244,0.7)]"
              :class="{ 'is-disabled cursor-not-allowed !bg-transparent color-[#c0c4cc]': item.disabled }"
              @click="handleMenuClick(item)"
            >
              <svgIcon
                v-if="item.icon"
                :icon="item.icon"
                :class="item.disabled ? 'color-[#c0c4cc]' : 'color-[#252f4a]'"
              />

              <span
                :class="item.disabled ? 'color-[#c0c4cc]' : 'color-[#252f4a]'"
              >
                {{ item.label }}
              </span>
            </li>

          </template>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>

</style>
