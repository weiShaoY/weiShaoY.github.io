<script lang="ts" setup>
import MobileMenu from './components/mobile-menu.vue'

import PcMenu from './components/pc-menu.vue'

import ThemeSwitch from './components/theme-switch.vue'

const menuList = [
  {
    key: '/home/about',
    label: 'About',
  },
  {
    key: '/home/work',
    label: 'Work',
  },
  {
    key: '/home/contact',
    label: 'Contact',
  },
  {
    key: '/blog',
    label: 'Blog',
  },
  {
    key: '/garage',
    label: 'Garage',
  },
]
</script>

<template>
  <nav
    class="fixed left-0 right-0 top-0 z-100 h-20 flex justify-center bg-[#191919]"
  >
    <div
      class="flex items-center justify-between p-x-5 container"
    >

      <Logo />

      <PcMenu
        v-if="!isMobile"
        :menu-list="menuList"
      />

      <!-- 右边 -->
      <div
        class="flex items-center gap-2"
      >
        <!-- 切换主题按钮 -->
        <ThemeSwitch />

        <MobileMenu
          v-if="isMobile"
          :menu-list="menuList"
        />
      </div>
    </div>
  </nav>
</template>

<style lang="less" scoped>

</style>
