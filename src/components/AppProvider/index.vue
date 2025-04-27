<script setup lang="ts">

import { createTextVNode, defineComponent } from 'vue'

import { NotifyPlugin,MessagePlugin } from 'tdesign-vue-next'

defineOptions({
  name: 'AppProvider',
})
NotifyPlugin
const ContextHolder = defineComponent({
  name: 'ContextHolder',
  setup() {
    function register() {
      window.$notify = NotifyPlugin
      window.$message = MessagePlugin
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
