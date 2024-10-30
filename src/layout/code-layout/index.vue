<!------------------------------------  代码模块  ------------------------------------------------->
<script lang="ts" setup>

import useResponsive from '@/hooks/responsive'

import { useCodeStore } from '@/store'

import {
  onMounted,
  provide,
  ref,
} from 'vue'

import { useRouter } from 'vue-router'

import CodePageLayout from './code-page-layout.vue'

import Breadcrumb from './components/breadcrumb/index.vue'

import Footer from './components/footer/index.vue'

import Menu from './components/menu/index.vue'

import NavBar from './components/navbar/index.vue'

import TabBar from './components/tab-bar/index.vue'

/**
 * 用于标识是否初始化
 */
const isInit = ref(false)

const codeStore = useCodeStore()

const router = useRouter()

/**
 * 响应式布局处理
 * @param {boolean} immediate - 是否立即执行
 */
useResponsive(true)

/**
 * 设置菜单折叠状态
 */
function setCollapsed(val: boolean) {
  // 用于页面初始化时菜单状态的问题
  if (!isInit.value) {
    return
  }

  codeStore.state.menu.collapsed = val
}

/**
 * 取消抽屉菜单
 */
function drawerCancel() {
  codeStore.state.drawer.visible = false
}

/**
 * 提供一个方法用于切换抽屉菜单可见状态
 */
provide('toggleDrawerMenu', () => {
  codeStore.state.drawer.visible = !codeStore.state.drawer.visible
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
    class="h-full w-full"
    :class="{ mobile: !codeStore.state.menu.visible }"
  >

    <!-- 顶部导航栏 -->
    <div
      v-if="codeStore.state.navbar.visible"
      class="fixed left-0 top-0 z-100 w-full"
      :style="{
        height: `${codeStore.state.navbar.height}px`,
      }"
    >
      <NavBar />
    </div>

    <!-- 导航栏下面部分  -->

    <!-- 导航栏下面主体部分 -->
    <a-layout
      class=""
    >

      <!--  菜单栏 start -->
      <!-- 菜单正常显示时的侧边栏菜单 -->
      <a-layout-sider
        v-if="codeStore.state.menu.visible && codeStore.state.menu.position === 'left'"
        v-show="codeStore.state.menu.visible"
        class="layout-sider"
        breakpoint="xl"
        :collapsed="codeStore.state.menu.collapsed"
        :collapsible="true"
        :width="codeStore.state.menu.collapsed ? codeStore.state.menu.collapsedWidth : codeStore.state.menu.expandedWidth"
        :style="{
          paddingTop: codeStore.state.navbar.visible ? '60px' : '',
        }"
        :hide-trigger="true"
        @collapse="setCollapsed"
      >
        <div
          class="menu-wrapper"
        >
          <Menu />
        </div>
      </a-layout-sider>

      <!-- 设置菜单不显示时 放到抽屉里的菜单 -->
      <a-drawer
        v-if="!codeStore.state.menu.visible"
        :visible="codeStore.state.drawer.visible"
        placement="left"
        :footer="false"
        mask-closable
        :closable="false"
        class="bg-gradient-from-pink"
        @cancel="drawerCancel"
      >
        <template
          #collapse-icon
        />

        <template
          #expand-icon-right
        />

        <Menu />
      </a-drawer>
      <!--  菜单栏 end -->

      <!-- 页面部分 -->
      <a-layout
        class="min-h-100vh overflow-y-hidden transition-padding duration-500 ease-in-out"
        :style="{
          paddingLeft: codeStore.state.menu.visible && codeStore.state.menu.position === 'left' ? `${codeStore.state.menu.collapsed ? codeStore.state.menu.collapsedWidth : codeStore.state.menu.expandedWidth}px` : '0',
          paddingTop: codeStore.state.navbar.visible ? `${codeStore.state.navbar.height}px` : '0',
        }"
      >

        <!-- 多页签 -->
        <TabBar
          v-if="codeStore.state.tabBar.visible"
        />

        <!-- 面包屑 -->
        <Breadcrumb
          v-if="
            codeStore.state.breadcrumb.visible && !router.currentRoute.value.meta.noShowBreadcrumb
          "
        />

        <!-- 页面区域 -->
        <a-layout-content
          class="m-x-5 m-b-5 flex bg-white p-t-0"
        >

          <CodePageLayout />

        </a-layout-content>

        <!-- 底部 -->
        <Footer
          v-if="codeStore.state.footer.visible && !router.currentRoute.value.meta.noShowFooter"
        />

      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="less">

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
