<!------------------------------------  面包屑  ------------------------------------------------->

<script lang="ts" setup>
import type { PropType } from 'vue'

import { useAppStore } from '@/store'

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

const appStore = useAppStore()

const breadcrumbAffixRef = ref()

const router = useRouter()

/**
 *  计算顶部偏移量
 *  @returns {number} 顶部偏移量
 */
const offsetTop = computed(() => {
  // return appStore.state.navbar ? 60 : 0
  if (appStore.state.navbar && appStore.state.tabBar) {
    return 60 + 33
  }

  if (appStore.state.navbar && !appStore.state.tabBar) {
    return 60
  }

  if (appStore.state.tabBar && !appStore.state.navbar) {
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
    appStore.state.navbar,
    appStore.state.tabBar,
  ],
  () => {
    breadcrumbAffixRef.value.updatePosition()
  },
)
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
        class="h-14 flex items-center overflow-hidden bg-#F2F3F5 p-l-7"
      >

        <a-breadcrumb>
          <a-breadcrumb-item>
            <icon-apps />
          </a-breadcrumb-item>

          <a-breadcrumb-item
            v-for="(item, index) in router.currentRoute.value.matched"
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
