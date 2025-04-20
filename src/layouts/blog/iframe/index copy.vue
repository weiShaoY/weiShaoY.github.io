<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()

/**
 *  是否加载完成
 */
const isLoaded = ref(false)

/**
 *  监听 route.meta.iframeUrl 的变化
 */
const iframeUrl = computed(() => (route.meta.iframeUrl as string) ?? '')

function handleClick() {
  if (iframeUrl.value) {
    window.open(iframeUrl.value, '_blank', 'noopener,noreferrer')
  }
  else {
    console.warn('iframeUrl 未找到，请确保 meta 中包含 iframeUrl')
  }
}

onMounted(() => {
  if (!iframeUrl.value) {
    console.warn('iframeUrl 未找到，请确保 meta 中包含 iframeUrl')
  }
})
</script>

<template>
  <div
    className="h-full w-full relative flex flex-col"
  >

    <div
      v-if="!isLoaded"
      class="absolute inset-0 z-10 flex items-center justify-center bg-white"
    >
      <!-- 这里是加载动画的具体内容 -->
      <a-spin
        :size="50"
      />
    </div>

    <div
      class="absolute left-0 top-0 z-10"
    >
      <a-tooltip
        content="在新标签页打开"
        position="top"
      >
        <a-button
          shape="circle"
          class="!bg-white"
          @click="handleClick"
        >

          <SvgIcon
            icon="arrow-top-right"
          />
        </a-button>
      </a-tooltip>
    </div>

    <iframe
      v-if="iframeUrl"
      :src="iframeUrl"
      frameborder="0"
      class="h-full w-full"
      @load="isLoaded = true"
    />

  </div>
</template>

<style scoped>
iframe {
  border: none;
}
</style>
