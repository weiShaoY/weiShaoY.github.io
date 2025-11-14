<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import { homeConfig } from '@/configs'

import { isMobile } from '@/utils'

import MobileMenu from './components/mobile-menu.vue'

const route = useRoute()

const router = useRouter()

/**
 *  是否为开发环境
 */
const isDevelopment = window.$isDevelopment

/**
 *  应用的在线演示地址
 */
const appDemoUrl = import.meta.env.VITE_APP_DEMO_URL

/**
 *  应用的代码仓库地址
 */
const appRepoUrl = import.meta.env.VITE_APP_REPO_URL

/**
 *  路由根地址
 */
const routerRootPath = import.meta.env.VITE_ROUTER_ROOT_PATH

const pcMenuList = homeConfig.headerRouterList.filter(({ isDevelopmentOnly }) =>
  isDevelopment || !isDevelopmentOnly,
)

const mobileMenuList = homeConfig.headerRouterList.filter(({ isPCOnly, isDevelopmentOnly }) =>
  !isPCOnly && (isDevelopment || !isDevelopmentOnly),
)

/**
 *  跳转到首页
 */
function handleToHome() {
  if (route.path === routerRootPath) {
    return
  }

  router.push(routerRootPath)
}

/**
 * 跳转路由或链接
 */
function handleSelect(item: HomeType.HeaderRouter) {
  if (route.path === item.value) {
    return
  }

  router.push(item.value)
}

</script>

<template>
  <nav
    class="fixed left-0 right-0 top-0 z-100 flex justify-center bg-[#191919] bg-opacity-90 shadow-md"
    :style="{
      height: `${homeConfig.headerHeight}px`,
    }"
  >
    <div
      class="container relative flex items-center justify-between max-sm:mx-5"
    >

      <!-- Logo区域 -->
      <a
        class="z-999 flex items-center"
      >
        <SvgIcon
          icon="logo"
          :size="60"
          class="cursor-pointer"
          @click="handleToHome"
        />

        <SvgIcon
          icon="weiShaoY"
          :size="120"
          class="cursor-pointer !hover:color-[#08FF00]"
          @click="handleToHome"
        />
      </a>

      <!-- PC端菜单 -->
      <div
        v-if="!isMobile"
        class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-5"
      >
        <span
          v-for="item in pcMenuList"
          :key="item.value"
          class="flex cursor-pointer items-center text-lg text-[#D0D2D6] font-bold hover:text-primary"
          :class="{ 'text-primary': route.path === item.value }"
          @click="handleSelect (item)"
        >
          {{ item.label }}
        </span>
      </div>

      <!-- 操作按钮区域 -->
      <div
        class="flex flex items-center justify-end gap-5"
      >
        <Github />

        <!-- 开发环境且非移动端显示额外按钮 -->
        <template
          v-if="isDevelopment && !isMobile"
        >
          <LinkButton
            icon="home-navbar-demo"
            :size="36"
            :url="appDemoUrl"
          />

          <LinkButton
            icon="home-navbar-warehouse"
            :size="36"
            :url="appRepoUrl"
          />
        </template>

        <!-- 移动端菜单 -->
        <template
          v-else
        >
          <MobileMenu
            :menu-list="mobileMenuList"
          />
        </template>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>

</style>
