<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()

/**
 *  监听 route.meta.iframeUrl 的变化
 */
const iframeUrl = computed(() => route.meta.iframeUrl as string)

onMounted(() => {
  if (!iframeUrl.value) {
    console.warn('iframeUrl 未找到，请确保 meta 中包含 iframeUrl')
  }
})
</script>

<template>
  <iframe
    v-if="iframeUrl"
    :src="iframeUrl"
    frameborder="0"
    style="width: 100%; height: 100%;"
  />
</template>

<style scoped>
iframe {
  border: none;
}
</style>
