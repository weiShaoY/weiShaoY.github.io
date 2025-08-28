<script setup lang="ts">
import { homeConfig } from '@/configs'

import MobileMenu from './components/mobile-menu.vue'

import PcMenu from './components/pc-menu.vue'

const isDevelopment = import.meta.env.VITE_APP_NODE_ENV === 'development'

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

</script>

<template>
  <nav
    class="fixed left-0 right-0 top-0 z-100 h-20 flex justify-center bg-[#191919] bg-opacity-90 shadow-md"
  >
    <div
      class="container relative flex items-center justify-between max-sm:mx-5"
    >

      <!-- 左侧logo -->
      <div
        class="flex items-center"
      >
        <IconLogo />

        <TextLogo
          :size="120"
          color="white"
          url="/"
        />
      </div>

      <!-- 菜单 -->
      <PcMenu
        v-if="!isMobile"
        :menu-list="pcMenuList"
      />

      <MobileMenu
        v-else
        :menu-list="mobileMenuList"
      />
    </div>
  </nav>
</template>

<style lang="scss" scoped>

</style>
