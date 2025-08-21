<!-- 内容布局 -->
<script setup lang="ts">
import { useBlogStore } from '@/stores'

const blogStore = useBlogStore()

// 容器样式
const containerStyle = computed(() => ({
  maxWidth: blogStore.setting.container.maxWidth,
}))

// 过渡动画配置
const transitionProps = {
  name: 'slide-bottom',
  mode: 'out-in',
  appear: true,
} as const

</script>

<template>
  <div
    class="layout-content m-auto w-[calc(100%-40px)]"
    :style="containerStyle"
  >
    <RouterView
      v-slot="{ Component, route }"
      class="w-full"
      :style="{ minHeight: blogStore.setting.container.minHeight }"
    >
      <!-- 需要缓存的页面 -->
      <Transition
        v-bind="transitionProps"
      >
        <KeepAlive
          :max="20"
          :exclude="blogStore.keepAliveExclude"
        >
          <component
            :is="Component"
            v-if="route.meta.keepAlive"
            :key="route.path"
          />
        </KeepAlive>
      </Transition>

      <!-- 不需要缓存的页面 -->
      <Transition
        v-bind="transitionProps"
      >
        <component
          :is="Component"
          v-if="!route.meta.keepAlive"
          :key="route.path"
        />
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
.layout-content {
  transition: max-width 0.3s ease-in-out;
}
</style>
