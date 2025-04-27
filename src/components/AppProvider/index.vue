<script setup lang="ts">
import {
  ElMessage,
  ElMessageBox,
} from 'element-plus'

import { createTextVNode, defineComponent } from 'vue'

import { NotifyPlugin} from 'tdesign-vue-next'

defineOptions({
  name: 'AppProvider',
})
NotifyPlugin
const ContextHolder = defineComponent({
  name: 'ContextHolder',
  setup() {
    function register() {
      window.$notify = NotifyPlugin
      window.$messageBox = ElMessageBox
      window.$message = ElMessage
    }

    register()

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
