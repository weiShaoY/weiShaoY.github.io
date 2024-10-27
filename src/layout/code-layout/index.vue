<script lang="ts" setup>

import useResponsive from '@/hooks/responsive'

import { useAppStore } from '@/store'

import {
  computed,
  onMounted,
  provide,
  ref,
} from 'vue'

import { useRouter } from 'vue-router'

import Breadcrumb from './components/breadcrumb/index.vue'

import Footer from './components/footer/index.vue'

import Menu from './components/menu/index.vue'

import NavBar from './components/navbar/index.vue'

import PageLayout from './components/page-layout/index.vue'

import TabBar from './components/tab-bar/index.vue'

/**
 * 用于标识是否初始化
 */
const isInit = ref(false)

/**
 * 获取应用状态 store
 */
const appStore = useAppStore()

/**
 * 获取用户状态 store
 * @type {ReturnType<typeof useUserStore>}
 */

const router = useRouter()

/**
 * 响应式布局处理
 * @param {boolean} immediate - 是否立即执行
 */
useResponsive(true)

/**
 * 导航栏高度
 */
const navbarHeight = `60px`

/**
 * 是否显示导航栏
 */
const navbar = computed(() => appStore.state.navbar)

/**
 * 计算属性，判断是否渲染菜单
 * @returns {boolean} 是否渲染菜单
 */
const renderMenu = computed(
  () => appStore.state.menu && !appStore.state.topMenu,
)

/**
 * 计算属性，判断是否隐藏菜单
 * @returns {boolean} 是否隐藏菜单
 */
const hideMenu = computed(() => appStore.state.hideMenu)

/**
 * 计算属性，获取菜单宽度
 * @returns {number} 菜单宽度
 */
const menuWidth = computed(() => {
  return appStore.state.menuCollapse ? 48 : appStore.state.menuWidth
})

/**
 * 计算属性，获取菜单折叠状态
 * @returns {boolean} 菜单是否折叠
 */
const collapsed = computed(() => {
  return appStore.state.menuCollapse
})

/**
 * 设置菜单折叠状态
 */
function setCollapsed(val: boolean) {
  // 用于页面初始化时菜单状态的问题
  if (!isInit.value) {
    return
  }

  appStore.updateSettings({
    menuCollapse: val,
  })
}

/**
 * 抽屉菜单可见状态
 * @type {boolean}
 */
const drawerVisible = ref(false)

/**
 * 取消抽屉菜单
 */
function drawerCancel() {
  drawerVisible.value = false
}

/**
 * 提供一个方法用于切换抽屉菜单可见状态
 */
provide('toggleDrawerMenu', () => {
  drawerVisible.value = !drawerVisible.value
})

/**
 * 组件挂载时执行
 */
onMounted(() => {
  isInit.value = true
})
</script>

<template>
  <a-layout
    class="layout"
    :class="{ mobile: appStore.state.hideMenu }"
  >
    <div
      v-if="appStore.state.navbar"
      class="layout-navbar"
    >
      <NavBar />
    </div>

    <a-layout>
      <a-layout>
        <a-layout-sider
          v-if="renderMenu"
          v-show="!hideMenu"
          class="layout-sider"
          breakpoint="xl"
          :collapsed="collapsed"
          :collapsible="true"
          :width="menuWidth"
          :style="{ paddingTop: navbar ? '60px' : '' }"
          :hide-trigger="true"
          @collapse="setCollapsed"
        >
          <div
            class="menu-wrapper"
          >
            <Menu />
          </div>
        </a-layout-sider>

        <a-drawer
          v-if="hideMenu"
          :visible="drawerVisible"
          placement="left"
          :footer="false"
          mask-closable
          :closable="false"
          @cancel="drawerCancel"
        >
          22222222222
          <Menu />
        </a-drawer>

        <!-- 右边 -->
        <a-layout
          class="min-h-100vh overflow-y-hidden transition-padding duration-500 ease-in-out"
          :style="{
            paddingLeft: renderMenu && !hideMenu ? `${menuWidth}px` : '0',
            paddingTop: navbar ? `${navbarHeight}px` : '0',
          }"
        >
          <!-- 多页签 -->
          <TabBar
            v-if="appStore.state.tabBar"
          />

          <!-- 面包屑 -->
          <Breadcrumb
            v-if="
              appStore.state.breadcrumb && !router.currentRoute.value.meta.noShowBreadcrumb
            "
          />

          <!-- 内容区域 -->
          <a-layout-content
            class="m-x-5 m-b-5 flex bg-white p-t-0"
          >
            <PageLayout />
          </a-layout-content>

          <Footer
            v-if=" appStore.state.footer && !router.currentRoute.value.meta.noShowFooter
            "
          />
        </a-layout>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;

.layout {
  width: 100%;
  height: 100%;
}

.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: @nav-size-height;
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
    content: '';
  }

  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}
</style>
