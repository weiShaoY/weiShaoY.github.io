<script lang="ts" setup>
import { useCodeStore } from '@/store'

import { computed } from 'vue'

import Iframe from './components/iframe/index.vue'

const codeStore = useCodeStore()

/**
 * 缓存列表
 */
const cacheTabList = computed(() => codeStore.getCacheTabList)
</script>

<template>
  <!-- 使用 router-view 组件，并通过插槽获取当前组件和路由 -->
  <router-view
    v-slot="{ Component, route }"
  >
    <!-- 定义过渡效果的名称为 "fade" -->
    <transition
      name="fade"
      mode="out-in"
      appear
    >

      <!-- 1. 如果 route.meta 包含 iframeUrl，直接渲染 Iframe 组件 -->
      <Iframe
        v-if="route.meta.iframeUrl"
        :key="`iframe-${route.fullPath}`"
        :src="route.meta.iframeUrl"
      />

      <!-- 2. 否则，根据 ignoreCache 判断是否需要缓存 -->
      <keep-alive
        v-else-if="!route.meta.ignoreCache"
        :include="cacheTabList"
      >
        <component
          :is="Component"
          :key="`cache-${route.fullPath}`"
        />
      </keep-alive>

      <!-- 3. 不缓存的情况，直接渲染 Component -->
      <component
        :is="Component"
        v-else
        :key="`no-cache-${route.fullPath}`"
      />

    </transition>
  </router-view>
</template>

<style scoped lang="less"></style>
