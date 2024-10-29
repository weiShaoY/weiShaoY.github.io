<!------------------------------------  标签栏  ------------------------------------------------->

<script lang="ts" setup>
import type { RouteLocationNormalized } from 'vue-router'

import { CodeGuard } from '@/router/guard'

import { useCodeStore } from '@/store'

import {
  computed,
  onUnmounted,
  ref,
  watch,
} from 'vue'

import tabItem from './tab-item.vue'

const codeStore = useCodeStore()

const affixRef = ref()

/**
 *  获取标签列表
 *  @returns {Array} 标签列表
 */
const tagList = computed(() => {
  return codeStore.getTabList
})

/**
 *  计算顶部偏移量
 *  @returns {number} 顶部偏移量
 */
const offsetTop = computed(() => {
  return codeStore.state.navbar.visible ? 60 : 0
})

/**
 *  监视导航栏状态变化
 *  @param {Function} 回调函数，更新位置
 */
watch(
  () => codeStore.state.navbar.visible,
  () => {
    affixRef.value.updatePosition()
  },
)

/**
 *  监听路由变化，更新标签栏列表
 *  @param  route - 路由对象
 */
CodeGuard.listenerRouteChange((route: RouteLocationNormalized) => {
  if (
    !route.meta.noAffix && !tagList.value.some(tag => tag.fullPath === route.fullPath)
  ) {
    codeStore.updateTabList(route)
  }
}, true)

/**
 *  组件卸载时移除路由监听器
 */
onUnmounted(() => {
  CodeGuard.removeRouteChange()
})
</script>

<template>
  <div
    class="tab-bar-container"
  >
    <a-affix
      ref="affixRef"
      :offset-top="offsetTop"
    >
      <div
        class="tab-bar-box"
      >
        <div
          class="tab-bar-scroll"
        >
          <div
            class="tags-wrap"
          >
            <tab-item
              v-for="(tag, index) in tagList"
              :key="tag.fullPath"
              :index="index"
              :item-data="tag"
            />
          </div>
        </div>

        <!-- 右侧 -->
        <div
          class="h-8 w-20"
        />
      </div>
    </a-affix>
  </div>
</template>

<style scoped lang="less">
  .tab-bar-container {
  position: relative;
  background-color: var(--color-bg-2);

  .tab-bar-box {
    display: flex;
    padding: 0 0 0 20px;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
    .tab-bar-scroll {
      height: 32px;
      flex: 1;
      overflow: hidden;
      .tags-wrap {
        padding: 4px 0;
        height: 48px;
        white-space: nowrap;
        overflow-x: auto;

        :deep(.arco-tag) {
          display: inline-flex;
          align-items: center;
          margin-right: 6px;
          cursor: pointer;
          &:first-child {
            .arco-tag-close-btn {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
