<script setup lang="ts">

import { useTestStore } from '@/store/modules/test'

import { useDebounceFn } from '@vueuse/core'

import {
  h,
  onBeforeUnmount,
  provide,
  ref,
  watch,
} from 'vue'

import Footer from '../Footer/index.vue'

import Tabs from '../Tabs/index.vue'

import Maximize from './components/Maximize.vue'

const testStore = useTestStore()

/**
 *  用于控制路由组件的显示与刷新
 */
const isRouterShow = ref(true)

/**
 * 刷新当前页面
 * @param val 是否显示当前页面
 */
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val)

// 向子组件提供刷新方法
provide('refresh', refreshCurrentPage)

// 解决详情页 keep-alive 问题，创建组件包装器
const wrapperMap = new Map()

/**
 * 创建组件包装器，解决 keep-alive 在详情页的问题
 * @param component 需要渲染的组件
 * @param route 当前路由信息
 * @returns 渲染后的组件
 */
function createComponentWrapper(component: any, route: any) {
  if (!component) {
    return
  }

  const wrapperName = route.fullPath

  let wrapper = wrapperMap.get(wrapperName)

  if (!wrapper) {
    wrapper = {
      name: wrapperName,
      render: () => h(component),
    }
    wrapperMap.set(wrapperName, wrapper)
  }

  return h(wrapper)
}

// 监听 maximize 变量的变化，动态添加/移除最大化样式
watch(
  () => testStore.global.maximize,
  () => {
    const app = document.getElementById('app') as HTMLElement

    if (testStore.global.maximize) {
      app.classList.add('main-maximize')
    }
    else {
      app.classList.remove('main-maximize')
    }
  },
  {
    immediate: true,
  },
)

// 监听 layout 变量变化，在 body 上动态添加布局类名
watch(
  () => testStore.global.layout,
  () => {
    const body = document.body as HTMLElement

    body.setAttribute('class', testStore.global.layout)
  },
  {
    immediate: true,
  },
)

/**
 *  监听窗口大小变化，自动折叠/展开侧边栏
 */
const screenWidth = ref(0)

const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth
  if (!testStore.global.isCollapse && screenWidth.value < 1200) {
    testStore.setGlobal('isCollapse', true)
  }

  if (testStore.global.isCollapse && screenWidth.value > 1200) {
    testStore.setGlobal('isCollapse', false)
  }
}, 100)

// 监听窗口大小变化事件
window.addEventListener('resize', listeningWindow, false)

// 组件卸载时移除监听事件
onBeforeUnmount(() => {
  window.removeEventListener('resize', listeningWindow)
})
</script>

<template>
  <!-- 最大化模式组件 -->
  <Maximize
    v-show="testStore.global.maximize"
  />

  <!-- 顶部标签页组件 -->
  <Tabs
    v-show="testStore.global.tabs"
  />

  <!-- 主体内容区域 -->
  <el-main>
    <router-view
      v-slot="{ Component, route }"
    >
      <transition
        appear
        name="fade-transform"
        mode="out-in"
      >
        <keep-alive
          :include="testStore.keepAlive.keepAliveName"
        >
          <component
            :is="createComponentWrapper(Component, route)"
            v-if="isRouterShow"
            :key="route.fullPath"
          />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>

  <!-- 底部页脚 -->
  <el-footer
    v-show="testStore.global.footer"
  >
    <Footer />
  </el-footer>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
