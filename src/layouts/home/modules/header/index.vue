<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

import { homeConfig } from '@/configs'

import MobileMenu from './components/mobile-menu.vue'

import PcMenu from './components/pc-menu.vue'

const route = useRoute()

const router = useRouter()

/**
 *  是否为开发环境
 */
const isDevelopment = import.meta.env.VITE_APP_ENV === 'development'

/**
 *  网站在线地址
 */
const websiteUrl = import.meta.env.VITE_APP_DEMO_URL

/**
 *  路由根地址
 */
const routerRootPath = import.meta.env.VITE_ROUTER_ROOT_PATH

type HeaderRoute = typeof homeConfig.headerRouterList[number]

function shouldShowOnPC(item: HeaderRoute) {
  // 开发环境下，保留所有
  if (isDevelopment) {
    return true
  }

  // 非开发环境下，过滤掉 isDevelopmentOnly 为 true 的
  return !item.isDevelopmentOnly
}

function shouldShowOnMobile(item: HeaderRoute) {
  // 开发环境下：仅过滤掉 PC 专属
  if (isDevelopment) {
    return !item.isPCOnly
  }

  // 非开发环境：过滤掉 PC 专属 和 开发专属
  return !item.isPCOnly && !item.isDevelopmentOnly
}

const pcMenuList = homeConfig.headerRouterList.filter(shouldShowOnPC)

const mobileMenuList = homeConfig.headerRouterList.filter(shouldShowOnMobile)

function handleToHome() {
  if (route.path === routerRootPath) {
    return
  }

  router.push(routerRootPath)
}

</script>

<template>
  <nav
    class="fixed left-0 right-0 top-0 z-100 h-20 flex justify-center bg-[#191919] bg-opacity-90 shadow-md"
  >
    <div
      class="container relative flex items-center justify-between max-sm:mx-5"
    >

      <!-- 左侧logo -->
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

      <!-- 菜单 -->
      <!-- <PcMenu
        v-if="!isMobile"
        :menu-list="pcMenuList"
      />

      <MobileMenu
        v-else
        :menu-list="mobileMenuList"
      /> -->

      <div
        class="flex flex items-center justify-end gap-5"
      >
        <Github />

        <LinkButton
          v-if="isDevelopment"
          icon="home-navbar-demo"
          :size="36"
          :url="websiteUrl"
        />

        <LinkButton
          v-if="isDevelopment"
          icon="home-navbar-warehouse"
          :size="36"
          url="https://github.com/weiShaoY/weiShaoY.github.io"
        />
      </div>

    </div>
  </nav>
</template>

<style lang="scss" scoped>

</style>
