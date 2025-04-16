<!------  2025-04-16---18:18---星期三  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useTestStore } from '@/store'

import Breadcrumb from './breadcrumb.vue'

import FastWidth from './fast-enter.vue'

const { width } = useWindowSize()

const testStore = useTestStore()

const topWidth = computed(() => {
  return `calc(100% - ${testStore.setting.menu.leftMenuWidth + testStore.setting.menu.rightMenuWidth}px`
})

console.log('%c Line:14 🍑 topWidth.value', 'color:#465975', topWidth.value)

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
</script>

<template>
  <div
    class="fixed right-0 top-0 z-100 bg-white transition-all duration-500"
    :style="{
      width: topWidth,
    }"
  >
    <!-- 上部 -->
    <div
      class="relative h-15 flex select-none items-center justify-between border-b-[1px] border-[#eaebf1]"
    >
      <!-- 左侧 -->
      <div
        class="flex items-center gap-3"
      >
        <!-- 刷新按钮 -->
        <ButtonIcon
          class="ml-3"
          tooltip-content="刷新页面"
        >
          <div
            :class="{ 'animate-spin duration-[750ms]': refreshLoading }"
            @click="handleRefresh()"
          >
            <SvgIcon
              icon="blog-refresh"
            />
          </div>
        </ButtonIcon>

        <!-- 快速入口 -->
        <FastWidth
          v-if="width >= 1200"
        />

        <!-- 面包屑 -->
        <Breadcrumb />

      </div>

      <!-- 右侧 -->
      <div
        class=""
      >
        <!-- 搜索 -->
        <div
          class="search-wrap"
        >
          <div
            class="search-input"
            @click="openSearchDialog"
          >
            <div
              class="left"
            >

              <SvgIcon
                icon="search"
              />

              <span>搜索</span>
            </div>

            <div
              class="search-keydown"
            >
              <i
                class="iconfont-sys"
              >&#xeeac;</i>

              <span>k</span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>

</style>
