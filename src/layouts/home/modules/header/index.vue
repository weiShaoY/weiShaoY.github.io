<script setup lang="ts">
import { homeConfig } from '@/configs'

import MobileMenu from './components/mobile-menu.vue'

import PcMenu from './components/pc-menu.vue'

const isDevelopment = import.meta.env.VITE_APP_NODE_ENV === 'development'

const pcMenuList = homeConfig.headerRouterList.filter((item) => {
  // 开发环境下，保留所有
  if (isDevelopment) {
    return true
  }

  // 非开发环境下，过滤掉 isDevelopmentOnly 为 true 的
  else {
    return !item.isDevelopmentOnly
  }
})

const mobileMenuList = homeConfig.headerRouterList.filter((item) => {
  // 开发环境下，保留所有
  if (isDevelopment && !item.isPCOnly) {
    return true
  }
})

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
