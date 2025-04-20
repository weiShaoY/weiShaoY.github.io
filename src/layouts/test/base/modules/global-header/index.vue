<!------  2025-04-16---18:18---星期三  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useTestStore } from '@/store'

import { blogMittBus } from '@/utils'

import { useFullscreen } from '@vueuse/core'


import Breadcrumb from './breadcrumb.vue'

import FastWidth from './fast-enter.vue'

const { width } = useWindowSize()

const testStore = useTestStore()

const isWindows = navigator.userAgent.includes('Windows')

const topWidth = computed(() => {
  return `calc(100% - ${testStore.setting.menu.leftMenuWidth + testStore.setting.menu.rightMenuWidth}px`
})

/**
 *  是否刷新
 */
const refreshLoading = ref(false)

/**
 *  刷新
 */
function handleRefresh(time: number = 300) {
  refreshLoading.value = true

  setTimeout(() => {
    refreshLoading.value = false
    testStore.isRefresh = !testStore.isRefresh
  }, time)
}

/**
 *  打开顶部搜索框
 */
function openSearchDialog() {
  blogMittBus.emit('openSearchDialog')
}

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

function toggleFullScreen() {
  toggleFullscreen()
}

</script>

<template>

  <!-- 上部 -->
  <div
    class="fixed right-0 top-0 z-100 flex select-none items-center justify-between border-b-[1px] border-[#eaebf1] bg-white transition-all duration-500"
    :style="{
      width: topWidth,
      height: `${testStore.setting.header.height}px`,
    }"
  >
    <!-- 左侧 -->
    <div
      class="flex items-center gap-3"
    >

      <!-- 面包屑 -->
      <Breadcrumb
        class="ml-5"
      />
    </div>

    <!-- 右侧 -->
    <div
      class="flex items-center gap-3 p-r-5"
    >

      <!-- 搜索 -->
      <div
        class="group h-9 w-40 flex items-center justify-between border border-[#dbdfe9] rounded-3 border-solid p-x-3 hover:cursor-pointer"
        @click="openSearchDialog"
      >
        <div
          class="left"
        >
          <SvgIcon
            icon="search"
            class="transition-transform duration-300 !group-hover:scale-130"
          />

          <span
            class="ml-2 text-[13px] color-[#99a1b7]"
          > 搜索 </span>
        </div>

        <div
          class="h-5 flex items-center border border-[#dbdfe9] rounded-1 border-solid bg-[#fafbfc] p-x-[6px] color-[#99a1b7]"
        >
          <span
            class="text-3"
          >
            {{ isWindows ? 'ctrl' : '⌘' }}
          </span>

          <span
            class="ml-2 text-3"
          >
            k
          </span>
        </div>
      </div>

      <!-- 快速入口 -->
      <FastWidth
        v-if="width >= 1200"
      />

      <!-- 全屏按钮 -->
      <ButtonIcon
        tooltip-content="进入全屏"
        @click="toggleFullScreen()"
      >
        <div
          class="transition-transform duration-300"
          :class="{ 'hover:scale-120  ': !isFullscreen, 'hover:scale-90': isFullscreen }"
        >
          <SvgIcon
            :icon="!isFullscreen ? 'blog-topBar-fullscreen' : 'blog-topBar-exit-fullscreen'"
          />
        </div>
      </ButtonIcon>

      <!-- 刷新按钮 -->
      <ButtonIcon
        tooltip-content="刷新页面"
        @click="handleRefresh()"
      >
        <div
          :class="{ 'animate-spin duration-[750ms]': refreshLoading }"
        >
          <SvgIcon
            icon="blog-refresh"
          />
        </div>
      </ButtonIcon>
    </div>
  </div>

</template>

<style lang="less" scoped></style>
