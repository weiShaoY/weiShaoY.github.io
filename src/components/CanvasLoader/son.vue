<script setup>
import { defineAsyncComponent } from 'vue'

// 定义异步组件
const AsyncComponent = defineAsyncComponent(() =>
  import('./components/AsyncComponent.vue'),
)
</script>

<template>
  <div
    id="app"
  >
    <Suspense>
      <template
        #default
      >
        <!-- 在这里加载异步组件 -->
        <AsyncComponent />
      </template>

      <template
        #fallback
      >
        <!-- 在异步组件加载时显示的占位内容 -->
        <div>
          加载中...
        </div>
      </template>
    </Suspense>
  </div>
</template>
