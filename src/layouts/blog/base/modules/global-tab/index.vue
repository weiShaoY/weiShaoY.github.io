<!--
 * 工作标签页组件
 * @description 管理多标签页的打开、关闭和导航功能，支持右键菜单操作
 -->
<script setup lang="ts">
import type { LocationQueryRaw } from 'vue-router'

import type { MenuItemType } from './menu-right.vue'

import { useBlogStore } from '@/store'

import {
  computed,
  onMounted,
  ref,
  watch,
} from 'vue'

import { useRoute, useRouter } from 'vue-router'

import MenuItem from '../../components/menu-item.vue'

import MenuRight from './menu-right.vue'

const blogStore = useBlogStore()

const route = useRoute()

const router = useRouter()

const { currentRoute } = router

/**
 * DOM元素引用
 */
const scrollRef = ref<HTMLElement | null>(null) // 滚动容器

const tabsRef = ref<HTMLElement | null>(null) // 标签列表容器

const menuRef = ref() // 右键菜单组件实例

/**
 * 滚动状态
 */
const translateX = ref(0) // 水平滚动偏移量

const transition = ref('') // 过渡动画效果

const clickedPath = ref('') // 当前点击的标签路径

let startX = 0 // 触摸起始X坐标

let currentX = 0 // 当前触摸X坐标

/**
 * 计算属性
 */
const list = computed(() => blogStore.openedTabList) // 已打开的标签页列表

console.log('%c Line:59 🍪 list', 'color:#3f7cff', list)

/**
 *  当前激活的标签路径
 */
const activeTab = computed(() => currentRoute.value.path) // 当前激活的标签页

/**
 * 获取当前激活标签的索引
 */
const activeTabIndex = computed(() =>
  list.value.findIndex(tab => tab.path === activeTab.value),
)

/**
 * 获取当前激活标签页的DOM元素
 */
function getCurTabEl() {
  return document.getElementById(
    `scroll-li-${activeTabIndex.value}`,
  ) as HTMLElement
}

/**
 * 设置过渡动画效果
 */
function setTransition() {
  transition.value = 'transform 0.5s ease-in-out'
  setTimeout(() => {
    transition.value = ''
  }, 300)
}

/**
 * 自动定位当前标签页到可视区域
 */
function workTabAutoPosition() {
  if (!scrollRef.value || !tabsRef.value) {
    return
  }

  const scrollWidth = scrollRef.value.offsetWidth

  const ulWidth = tabsRef.value.offsetWidth

  const curTabEl = getCurTabEl()

  if (!curTabEl) {
    return
  }

  const { offsetLeft, clientWidth } = curTabEl

  const curTabRight = offsetLeft + clientWidth

  const targetLeft = scrollWidth - curTabRight

  if (
    (offsetLeft > Math.abs(translateX.value) && curTabRight <= scrollWidth)
    || (translateX.value < targetLeft && targetLeft < 0)
  ) {
    return
  }

  requestAnimationFrame(() => {
    if (curTabRight > scrollWidth) {
      translateX.value = Math.max(targetLeft - 6, scrollWidth - ulWidth)
    }
    else if (offsetLeft < Math.abs(translateX.value)) {
      translateX.value = -offsetLeft
    }
  })
}

/**
 * 生命周期钩子
 */
onMounted(() => {
  listenerScroll() // 初始化滚动监听
  addTouchListeners() // 添加触摸事件
  workTabAutoPosition() // 初始定位
})

/**
 * 监听路由变化
 */
watch(
  () => currentRoute.value,
  () => {
    setTransition()
    workTabAutoPosition()
  },
)

/**
 * 点击标签页导航
 */
function clickTab(item: RouterType.BlogRouteRecordRaw) {
  console.log('%c Line:156 🍺 item', 'color:#ed9ec7', item)
  router.push({
    path: item.path,
    query: item.query as LocationQueryRaw,
  })
}

/**
 * 关闭标签页
 * @param type 关闭类型: current/left/right/other/all
 * @param tabPath 目标标签路径
 */
function closeWorkTab(type: string, tabPath: string) {
  const path = typeof tabPath === 'string' ? tabPath : route.path

  switch (type) {
    case 'current':
      blogStore.removeTab(path)
      break
    case 'left':
      blogStore.removeLeft(path)
      break
    case 'right':
      blogStore.removeRight(path)
      break
    case 'other':
      blogStore.removeOthers(path)
      break
    case 'all':
      blogStore.removeAll(path)
      break
  }

  setTimeout(() => {
    workTabClosePosition()
  }, 100)
}

/**
 * 关闭标签页后的位置调整
 */
function workTabClosePosition() {
  if (!scrollRef.value || !tabsRef.value) {
    return
  }

  const curTabEl = getCurTabEl()

  if (!curTabEl) {
    return
  }

  const { offsetLeft, clientWidth } = curTabEl

  const scrollWidth = scrollRef.value.offsetWidth

  const ulWidth = tabsRef.value.offsetWidth

  const curTabLeft = offsetLeft + clientWidth

  requestAnimationFrame(() => {
    translateX.value = curTabLeft > scrollWidth ? scrollWidth - ulWidth : 0
  })
}

/**
 * 显示右键菜单
 */
function showMenu(e: MouseEvent, path?: string) {
  clickedPath.value = path || ''
  menuRef.value?.show(e)
  e.preventDefault()
  e.stopPropagation()
}

/**
 * 监听滚动事件
 */
function listenerScroll() {
  const xMax = 0

  tabsRef.value?.addEventListener(
    'wheel',
    (event: WheelEvent) => {
      if (!scrollRef.value || !tabsRef.value) {
        return
      }

      event.preventDefault()

      if (tabsRef.value.offsetWidth <= scrollRef.value.offsetWidth) {
        return
      }

      const xMin = scrollRef.value.offsetWidth - tabsRef.value.offsetWidth

      const delta
        = Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY

      translateX.value = Math.min(
        Math.max(translateX.value - delta, xMin),
        xMax,
      )
    },
    {
      passive: false,
    },
  )
}

/**
 * 添加触摸事件监听
 */
function addTouchListeners() {
  tabsRef.value?.addEventListener('touchstart', handleTouchStart)
  tabsRef.value?.addEventListener('touchmove', handleTouchMove)
  tabsRef.value?.addEventListener('touchend', handleTouchEnd)
}

/**
 * 处理触摸开始事件
 */
function handleTouchStart(event: TouchEvent) {
  startX = event.touches[0].clientX
}

/**
 * 处理触摸移动事件
 */
function handleTouchMove(event: TouchEvent) {
  if (!scrollRef.value || !tabsRef.value) {
    return
  }

  currentX = event.touches[0].clientX
  const deltaX = currentX - startX

  const xMin = scrollRef.value.offsetWidth - tabsRef.value.offsetWidth

  translateX.value = Math.min(Math.max(translateX.value + deltaX, xMin), 0)
  startX = currentX
}

/**
 * 处理触摸结束事件
 */
function handleTouchEnd() {
  setTransition()
}

/**
 * 右键菜单选项配置
 */
const menuItems = computed(() => {
  const clickedIndex = list.value.findIndex(
    tab => tab.path === clickedPath.value,
  )

  const isLastTab = clickedIndex === list.value.length - 1

  const isFirstOrSecondTab = clickedIndex <= 1

  const isOneTab = list.value.length === 1

  const disableOther = list.value.length === 2 && clickedIndex === 1

  return [
    {
      key: 'left',
      label: '关闭左侧',
      icon: 'blog-tab-close-left',
      disabled: isFirstOrSecondTab,
    },
    {
      key: 'right',
      label: '关闭右侧',
      icon: 'blog-tab-close-right',
      disabled: isLastTab,
    },
    {
      key: 'other',
      label: '关闭其他',
      icon: 'blog-tab-close-other',
      disabled: isOneTab || disableOther,
    },
    {
      key: 'all',
      label: '关闭全部',
      icon: 'blog-tab-close-all',
      disabled: isOneTab,
    },
  ]
})

/**
 * 处理右键菜单选择
 */
function handleSelect(item: MenuItemType) {
  const { key } = item

  const activeIndex = list.value.findIndex(
    tab => tab.path === activeTab.value,
  )

  const clickedIndex = list.value.findIndex(
    tab => tab.path === clickedPath.value,
  )

  // 处理标签跳转逻辑
  const shouldNavigate
    = (key === 'left' && activeIndex < clickedIndex)
      || (key === 'right' && activeIndex > clickedIndex)
      || key === 'other'

  if (shouldNavigate) {
    router.push(clickedPath.value)
  }

  closeWorkTab(key, clickedPath.value)
}

const topWidth = computed(() => {
  return `calc(100% - ${blogStore.setting.menu.leftMenuWidth + blogStore.setting.menu.rightMenuWidth}px`
})
</script>

<template>
  <div
    class="fixed right-0 top-0 z-100 select-none border-b-[1px] border-[#eaebf1] bg-white transition-all duration-500"
    :style="{
      width: topWidth,
      height: `${blogStore.setting.tab.height}px`,
      top: `${blogStore.setting.header.height}px`,
    }"
  >
    <div
      class="workTab tab-google"
    >
      <!-- 标签页滚动区域 -->
      <div
        ref="scrollRef"
        class="scroll-view"
      >
        <ul
          ref="tabsRef"
          class="tabs"
          :style="{
            transform: `translateX(${translateX}px)`,
            transition,
          }"
        >
          <li
            v-for="(item, index) in list"
            :id="`scroll-li-${index}`"
            :key="item.path"
            class="art-custom-card"
            :class="{ 'active-tab': item.path === activeTab }"
            @click="clickTab(item)"
            @contextmenu.prevent="(e: MouseEvent) => showMenu(e, item.path)"
          >
            <!-- <div
              class="flex items-center"
            >
              <span
                class="mr-2"
              >
                {{ item.meta.title }}
              </span>

              <SvgIcon
                v-if="index !== 0"
                :size="10"
                icon="close"
                @click.stop="closeWorkTab('current', item.path)"
              />
            </div> -->

            <div
              class="flex items-center gap-3"
            >
              <MenuItem
                :menu="item"
              />

              <!-- 关闭 -->
              <SvgIcon
                v-if="index !== 0"
                :size="12"
                icon="close"
                @click.stop="closeWorkTab('current', item.path)"
              />
            </div>

            <div
              class="line"
            />
          </li>
        </ul>
      </div>

      <!-- 右侧操作菜单 -->
      <div
        class="right"
      >
        <el-dropdown
          @command="closeWorkTab"
        >
          <div
            class=""
          >
            <ButtonIcon
              icon="blog-tab-close-open"
            />
          </div>

          <template
            #dropdown
          >
            <el-dropdown-menu>
              <el-dropdown-item
                command="left"
                :disabled="activeTabIndex === 0 || activeTabIndex === 1"
              >
                <SvgIcon
                  class="mr-2"
                  icon="blog-tab-close-left"
                  :size="18"
                />

                <span>关闭左侧</span>
              </el-dropdown-item>

              <el-dropdown-item
                command="right"
                :disabled="activeTabIndex === list.length - 1"
              >
                <SvgIcon
                  class="mr-2"
                  icon="blog-tab-close-right"
                  :size="18"
                />

                <span>关闭右侧</span>
              </el-dropdown-item>

              <el-dropdown-item
                command="other"
                :disabled="
                  list.length === 1
                    || (list.length === 2 && activeTabIndex === 1)
                "
              >
                <SvgIcon
                  class="mr-2"
                  icon="blog-tab-close-other"
                  :size="18"
                />

                <span>关闭其他</span>
              </el-dropdown-item>

              <el-dropdown-item
                command="all"
                :disabled="list.length === 1"
              >
                <SvgIcon
                  class="mr-2"
                  icon="blog-tab-close-all"
                  :size="18"
                />

                <span>关闭全部</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <!-- 右键菜单组件 -->
      <MenuRight
        ref="menuRef"
        :menu-items="menuItems"
        @select="handleSelect"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use './index.scss';
</style>
