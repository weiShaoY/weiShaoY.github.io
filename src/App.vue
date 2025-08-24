<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { homeMittBus } from '@/utils'

import { isMobile } from '@/utils/isMobile'

/**
 * 组件名称
 */
defineOptions({
  name: 'App',
})

watchEffect(() => {
  console.log('%c Line:17 🍣 isMobile.value', 'color:#e41a6a', isMobile.value)
})

const visible = ref(true)

const progress = ref(0)

const timer = ref<NodeJS.Timeout | null>(null)

// 关闭 loading 的函数
function closeLoading() {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }

  progress.value = 100
  setTimeout(() => {
    visible.value = false
  }, 500) // 确保视觉效果平滑过渡
}

function startProgress() {
  timer.value = setInterval(() => {
    if (progress.value < 90) {
      progress.value += 1
    }
  }, 200) // 减少间隔, 更平滑 (可选)
}

onMounted(() => {
  startProgress()
  homeMittBus.on('hideHomePageLoading', () => {
    closeLoading()
  })
})
onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})
</script>

<template>
  <ElConfigProvider
    :locale="zhCn"
  >
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ElConfigProvider>

  <HomePageLoading
    :visible="visible"
    :progress="progress"
  />
</template>
