<script lang="ts" setup>

import MobileMenu from './components/mobile-menu.vue'

import PcMenu from './components/pc-menu.vue'

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
    key: '/command',
    label: 'Command',
  },
  {
    key: '/garage',
    label: 'Garage',
  },
  {
    key: '/test',
    label: 'Test',
  },
]

const isDevelopment = import.meta.env.VITE_APP_NODE_ENV
</script>

<template>
  <nav
    class="fixed left-0 right-0 top-0 z-100 h-20 flex justify-center bg-[#191919]"
  >
    <div
      class="mx-5 flex items-center justify-between container"
    >

      <Logo />

      <PcMenu
        v-if="!isMobile"
        :menu-list="menuList"
      />

      <!-- 右边 -->
      <div
        class="flex items-center gap-5"
      >
        <Github />

        <MobileMenu
          v-if="isMobile"
          :menu-list="menuList"
        />

        <!-- 仅开发环境显示  -->
        <a-link
          v-if="isDevelopment"
          href="https://weishaoy.github.io/"
          target="_blank"
        >
          <SvgIcon
            :size="32"
            icon="home-navbar-demo"
          />
        </a-link>
      </div>
    </div>
  </nav>
</template>

<style lang="less" scoped>

</style>
