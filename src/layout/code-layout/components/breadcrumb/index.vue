<!------------------------------------  面包屑  ------------------------------------------------->

<script lang="ts" setup>
import config from '@/config'

import { useCodeStore } from '@/store'

import { useRouter } from 'vue-router'

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
  () => [codeStore.state.navbar.visible, codeStore.state.tabBar.visible],

  () => {
    breadcrumbAffixRef.value.updatePosition()
  },
)

const matchedList = computed(() => {
  const list = router.currentRoute.value.matched.slice(1)

  return list
})
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
          <a-breadcrumb-item
            class="cursor-pointer"
          >
            <a-link
              @click="codeStore.state.menu.collapsed = !codeStore.state.menu.collapsed"
            >
              <SvgIcon
                icon="code-breadcrumb-app"
                :size="16"
              />
            </a-link>
          </a-breadcrumb-item>

          <template
            v-for="(item, index) in matchedList"
            :key="index"
          >
            <a-breadcrumb-item
              v-if="index < matchedList.length - 1 && item.meta.locale !== config.code.defaultRoute.title"
            >
              <a-link
                @click="router.push(item.path)"
              >
                {{ item.meta.locale }}
              </a-link>
            </a-breadcrumb-item>

            <a-breadcrumb-item
              v-else-if="item.meta.locale"
            >
              {{ item.meta.locale }}
            </a-breadcrumb-item>
          </template>
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
