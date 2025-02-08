<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()

const router = useRouter()

/**
 *  监听 route.meta.externalUrl 的变化
 */
const externalUrl = computed(() => route.meta.externalUrl as string)

onMounted(() => {
  if (!externalUrl.value) {
    console.warn('iframeUrl 未找到，请确保 meta 中包含 iframeUrl')
  }

  window.open(externalUrl.value, '_black')

  // 返回上一页
  router.back()
})
</script>

<template>
  <div
    class=""
  />
</template>

<style scoped>

</style>
