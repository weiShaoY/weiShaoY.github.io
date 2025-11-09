<!------------------------------------  应用提供者 (提供全局组件)  ------------------------------------------------->
<script setup lang="ts">
import {
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus'

import {
  createTextVNode,
  defineComponent,
  onMounted,
  onUnmounted,
} from 'vue'

/**
 * 组件名称
 */
defineOptions({
  name: 'AppProvider',
})

const isDevelopment = import.meta.env.VITE_APP_NODE_ENV === 'development'

/**
 * 上下文持有者组件
 * 用于注册全局消息组件
 */
const ContextHolder = defineComponent({
  name: 'ContextHolder',
  setup() {
    /**
     * 注册全局消息组件
     */
    function registerGlobalComponents() {
      try {
        window.$notification = ElNotification
        window.$messageBox = ElMessageBox
        window.$message = ElMessage
        window._DEV__ = isDevelopment
      }
      catch {
        console.error('注册全局组件失败')
      }
    }

    onMounted(() => {
      registerGlobalComponents()
    })

    onUnmounted(() => {
    })

    return () => createTextVNode()
  },
})
</script>

<template>
  <div
    class="h-full"
  >
    <ContextHolder />

    <slot />
  </div>
</template>

<style scoped></style>
