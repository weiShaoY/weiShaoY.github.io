<script setup lang="ts">
import type { TabPaneName, TabsPaneContext } from 'element-plus'

import { useTestStore } from '@/store/modules/test'


import Sortable from 'sortablejs'

import {
  computed,
  onMounted,
  ref,
  watch,
} from 'vue'

import { useRoute, useRouter } from 'vue-router'

import MoreButton from './components/MoreButton.vue'

const route = useRoute()

const router = useRouter()



const testStore = useTestStore()

/** 当前选中的 tab 路径 */
const tabsMenuValue = ref(route.fullPath)

/** 计算属性：获取 tab 列表 */
const tabsMenuList = computed(() => testStore.tabs.tabsMenuList)

/** 计算属性：是否显示 tab 图标 */
const tabsIcon = computed(() => testStore.global.tabsIcon)

onMounted(() => {
  tabsDrop()
  initTabs()
})

/**
 * 监听路由变化，更新当前 tab 选中状态
 * 防止浏览器后退/前进导致 tabsMenuValue 不更新
 */
watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull) {
      return
    }

    tabsMenuValue.value = route.fullPath
    const tabsParams = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      close: !route.meta.isAffix,
      isKeepAlive: route.meta.isKeepAlive as boolean,
    }

    testStore.addTabs(tabsParams)
  },
  {
    immediate: true,
  },
)

/**
 * 初始化固定 tab，加载默认固定的标签页
 */
function initTabs() {
  testStore.flatMenuListGet().forEach((item) => {
    if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
      const tabsParams = {
        icon: item.meta.icon,
        title: item.meta.title,
        path: item.path,
        name: item.name,
        close: !item.meta.isAffix,
        isKeepAlive: item.meta.isKeepAlive,
      }

      testStore.addTabs(tabsParams)
    }
  })
}

/**
 * 使 tab 支持拖拽排序
 */
function tabsDrop() {
  Sortable.create(document.querySelector('.el-tabs__nav') as HTMLElement, {
    draggable: '.el-tabs__item',
    animation: 300,
    onEnd({ newIndex, oldIndex }:any) {
      const tabsList = [...testStore.tabs.tabsMenuList]

      const currRow = tabsList.splice(oldIndex as number, 1)[0]

      tabsList.splice(newIndex as number, 0, currRow)

      testStore.tabs.tabsMenuList = tabsList
    },
  })
}

/**
 * 处理 tab 点击事件
 * @param {TabsPaneContext} tabItem - 被点击的 tab 选项
 */
function tabClick(tabItem: TabsPaneContext) {
  const fullPath = tabItem.props.name as string

  router.push(fullPath)
}

/**
 * 处理 tab 关闭事件
 * @param {TabPaneName} fullPath - 需要关闭的 tab 路径
 */
function tabRemove(fullPath: TabPaneName) {
  testStore.removeTabs(fullPath as string, fullPath === route.fullPath)
}
</script>

<template>
  <div
    class="tabs-box"
  >
    <div
      class="tabs-menu"
    >
      <el-tabs
        v-model="tabsMenuValue"
        type="card"
        @tab-click="tabClick"
        @tab-remove="tabRemove"
      >
        <el-tab-pane
          v-for="item in tabsMenuList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.close"
        >
          <template
            #label
          >
            <el-icon
              v-if="item.icon && tabsIcon"
              class="tabs-icon"
            >
              <component
                :is="item.icon"
              />
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>

      <MoreButton />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
