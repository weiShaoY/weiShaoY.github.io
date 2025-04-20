<!-- 内容布局 -->
<script setup lang="ts">

import { useTestStore } from '@/store'

const testStore = useTestStore()

const containerStyle = computed(() => {
  return {
    maxWidth: testStore.setting.container.maxWidth,
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

watch(() => testStore.isRefresh, reload)
</script>

<template>
  <div
    class="layout-content m-auto w-[calc(100%-40px)]"
    :style="containerStyle"
  >

    <RouterView
      v-if="isRefresh"
      v-slot="{ Component, route }"
      class="w-full"
      :style="{ minHeight: testStore.setting.container.minHeight }"
    >
      <!-- 路由动画 -->
      <Transition
        name="slide-right"
        mode="out-in"
        appear
      >
        <KeepAlive
          :max="10"
          :exclude="testStore.keepAliveExclude"
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
