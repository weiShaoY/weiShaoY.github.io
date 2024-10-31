<!------------------------------------  面包屑  ------------------------------------------------->

<script lang="ts" setup>
import type { PropType } from 'vue'

import { useCodeStore } from '@/store'

import { useRouter } from 'vue-router'

defineProps({
  /**
   *  面包屑
   */
  items: {
    type: Array as PropType<string[]>,
    default() {
      return []
    },
  },
})

const codeStore = useCodeStore()

const breadcrumbAffixRef = ref()

const router = useRouter()

/**
 *  计算顶部偏移量
 *  @returns {number} 顶部偏移量
 */
const offsetTop = computed(() => {
  if (codeStore.state.navbar.visible && codeStore.state.tabBar.visible) {
    return 60 + 33
  }

  if (codeStore.state.navbar.visible && !codeStore.state.tabBar.visible) {
    return 60
  }

  if (!codeStore.state.navbar.visible && codeStore.state.tabBar.visible) {
    return 33
  }

  return 0
})

/**
 *  监视导航栏状态变化
 *  @param {Function} 回调函数，更新位置
 */
watch(

  () => [
    codeStore.state.navbar.visible,
    codeStore.state.tabBar.visible,
  ],

  () => {
    breadcrumbAffixRef.value.updatePosition()
  },
)

console.log('%c Line:65 🌽 router', 'color:#6ec1c2', router)
console.log('%c Line:65 🍰 router.currentRoute.value', 'color:#e41a6a', router.currentRoute.value)

</script>

<script lang="ts" setup>
</script>

<template>
  <div
    class="border-l-1 !relative"
  >
    <a-affix
      ref="breadcrumbAffixRef"
      :offset-top="offsetTop"
    >
      <div
        class="h-14 flex items-center overflow-hidden p-l-7"
      >

        <a-breadcrumb>
          <a-breadcrumb-item>
            <icon-apps />
          </a-breadcrumb-item>

          <a-breadcrumb-item
            v-for="(item, index) in router.currentRoute.value.matched.slice(1)"
            :key="index"
          >
            {{ item.meta.locale as string }}
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>

    </a-affix>
  </div>
</template>

<style scoped lang="less">
  :deep(.arco-breadcrumb-item) {
  color: rgb(var(--gray-6));
  &:last-child {
    color: rgb(var(--gray-8));
  }
}
</style>
