<script setup lang="ts">
import type { ElLoadingService } from 'element-plus'

import { ElLoading } from 'element-plus'

import { onMounted, ref } from 'vue'

import { useRoute } from 'vue-router'

/**
 * 路由实例
 */
const route = useRoute()

/**
 * iframe 元素引用
 */
const iframeRef = ref<HTMLIFrameElement | null>(null)

/**
 * iframe 容器元素引用
 */
const iframeContainer = ref<HTMLDivElement | null>(null)

/**
 * 加载状态
 */
const isLoading = ref(true)

/**
 * iframe 地址
 */
const iframeUrl = ref('')

/**
 * 加载实例
 */
let loadingInstance: ReturnType<typeof ElLoadingService> | null = null

/**
 * 处理 iframe 加载完成
 */
function handleIframeLoad(): void {
  isLoading.value = false
  closeLoading()
}

/**
 * 关闭加载状态
 */
function closeLoading(): void {
  if (loadingInstance) {
    loadingInstance.close()
    loadingInstance = null
  }
}

/**
 * 显示加载状态
 */
function showLoading(): void {
  if (!iframeContainer.value) {
    return
  }

  loadingInstance = ElLoading.service({
    target: iframeContainer.value,
    lock: true,
    background: 'rgba(0, 0, 0, 0.7)',
  })
}

/**
 * 初始化 iframe
 */
function initIframe(): void {
  const url = route.meta.iframeUrl as string | undefined

  if (!url) {
    window.$notification.error('iframeUrl 未找到，请确保 meta 中包含 iframeUrl')
    console.error('iframeUrl 未找到，请确保 meta 中包含 iframeUrl')
    return
  }

  iframeUrl.value = url
  showLoading()
}

onMounted(() => {
  initIframe()
})
</script>

<template>
  <div
    ref="iframeContainer"
    class="h-full flex"
  >
    <iframe
      v-if="iframeUrl"
      ref="iframeRef"
      :src="iframeUrl"
      frameborder="0"
      class="w-full flex-1 border-none"
      @load="handleIframeLoad"
    />
  </div>
</template>
