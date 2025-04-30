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

</script>

<template>
  <!-- 页面容器 -->
  <div
    class="layout-content m-auto w-[calc(100%-40px)]"
    :style="containerStyle"
  >

    <!-- 路由视图容器 -->
    <!-- v-if控制是否渲染，可用于强制刷新 -->
    <!-- v-slot获取当前路由对应的组件和路由信息 -->
    <!-- 设置宽度100%和动态最小高度 -->
    <RouterView
      v-if="isRefresh"
      v-slot="{ Component, route }"
      class="w-full"
      :style="{ minHeight: blogStore.setting.container.minHeight }"
    >

      <!-- 需要缓存的页面部分 -->
      <!-- 缓存组件渲染 -->
      <Transition
        name="slide-bottom"
        mode="out-in"
        appear
      >
        <!-- KeepAlive缓存组件，最多20个，排除不缓存的组件 -->
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

      <!-- 非缓存组件渲染 -->
      <Transition
        name="slide-bottom"
        mode="out-in"
        appear
      >
        <!-- 动态渲染组件 -->
        <!-- 当路由meta中keepAlive为false时渲染 -->
        <component
          :is="Component"
          v-if="!route.meta.keepAlive"
          :key="route.path"
        />
      </Transition>
    </RouterView>

  </div>
</template>
