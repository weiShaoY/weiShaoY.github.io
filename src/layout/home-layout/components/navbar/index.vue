<script lang="ts" setup>
import { useAppStore } from '~/store'

import DesktopPageSwitch from './components/desktop-page-switch.vue'

import MobilePageSwitch from './components/mobile-page-switch.vue'

import ThemeSwitch from './components/theme-switch.vue'

const router = useRouter()

const appStore = useAppStore()
</script>

<template>
  <nav
    class="h-full flex justify-center bg-#e2e5e5 dark:bg-#191919"
  >
    <div
      class="flex items-center justify-between p-x-5 container"
    >
      <!-- logo -->
      <a
        class="group hover:cursor-pointer"
        @click="router.push('/home')"
      >
        <SvgIcon
          icon="weiShaoY"
          class="!h-full !w-35 group-hover:color-primary"
        />
      </a>

      <!-- 桌面端页面切换 -->
      <DesktopPageSwitch
        v-if="!appStore.isMobile"
      />

      <!-- 右边 -->
      <div
        class="flex items-center gap-2"
      >
        <!-- 切换主题按钮 -->
        <ThemeSwitch />

        <!-- 移动端页面切换 -->
        <MobilePageSwitch
          v-if="appStore.isMobile"
        />
      </div>
    </div>
  </nav>
</template>

<style lang="less" scoped>

</style>
