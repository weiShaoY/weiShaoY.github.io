<script setup lang="ts">
import { useTestStore } from '@/store'

import { LAYOUT_SCROLL_EL_ID } from '@sa/materials'

import { computed } from 'vue'

defineOptions({
  name: 'GlobalContent',
})

withDefaults(defineProps<Props>(), {
  showPadding: true,
})

type Props = {

  /** 是否显示内容的内边距 */
  showPadding?: boolean
}

const testStore = useTestStore()

/**
 * 计算过渡动画名称
 */
const transitionName = computed(() => (testStore.theme.page.animate ? testStore.theme.page.animateMode : ''))

/**
 * 重置滚动条位置
 */
function resetScroll() {
  const el = document.querySelector(`#${LAYOUT_SCROLL_EL_ID}`)

  el?.scrollTo({
    left: 0,
    top: 0,
  })
}
</script>

<template>
  <RouterView
    v-slot="{ Component, route }"
  >
    <!-- 过渡效果 -->
    <Transition
      :name="transitionName"
      mode="out-in"
      @before-leave="testStore.app.contentXScrollable = true"
      @after-leave="resetScroll"
      @after-enter="testStore.app.contentXScrollable = false"
    >
      <!-- 缓存组件 -->
      <KeepAlive
        :include="testStore.router.cacheRouteList"
        :exclude="testStore.router.excludeCacheRouteList"
      >
        <component
          :is="Component"
          v-if="testStore.app.reloadFlag"
          :key="testStore.tabFUNC.getTabPathByRoute(route as any)"
          :class="{ 'p-[16px]': showPadding }"
          class="bg-layout flex-grow transition-300"
        />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<style></style>
