<!-- 内容布局 -->
<script setup lang="ts">

import { useBlogStore } from '@/store'

const blogStore = useBlogStore()

const containerStyle = computed(() => {
  return {
    maxWidth: blogStore.setting.container.maxWidth,
  }
})

const isRefresh = ref(true)

// Methods
function reload() {
  isRefresh.value = false
  nextTick(() => {
    isRefresh.value = true
  })
}

watch(() => blogStore.isRefresh, reload)

console.log('%c Line:27 🍎 blogStore.setting.container.minHeight', 'color:#b03734', blogStore.setting.container.minHeight)

</script>

<template>
  <!-- 页面容器 -->
  <div
    class="layout-content m-auto w-[calc(100%-40px)]"
    :style="containerStyle"
  >

    <RouterView
      v-if="isRefresh"
      v-slot="{ Component, route }"
      class="w-full"
      :style="{ minHeight: blogStore.setting.container.minHeight }"
    >
      <!-- 路由动画 -->
      <Transition
        name="slide-right"
        mode="out-in"
        appear
      >
        <KeepAlive
          :max="10"
          :exclude="blogStore.keepAliveExclude"
        >
          <component
            :is="Component"
            v-if="route.meta.keepAlive"
            :key="route.path"
          />
        </KeepAlive>
      </Transition>

      <Transition
        name="slide-right"
        mode="out-in"
        appear
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
