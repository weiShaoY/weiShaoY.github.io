<script setup lang="ts">
import { policeLayoutConfig } from '@/configs'

import GlobalHeader from './modules/global-header/index.vue'

</script>

<template>
  <div
    class="h-screen w-full flex flex-col bg-black"
  >
    <!-- 顶部导航栏 -->
    <GlobalHeader />

    <div
      class="mt-20 w-full overflow-auto"
      :style="{
        height: `calc(100vh - ${policeLayoutConfig.headerHeight}px)`,
      }"
    >
      <!-- 路由切换动画 -->
      <Suspense>
        <template
          #default
        >
          <router-view
            v-slot="{ Component }"
          >
            <Transition
              name="slide-left"
              mode="out-in"
              appear
            >
              <component
                :is="Component"
              />
            </Transition>
          </router-view>
        </template>

        <template
          #fallback
        >
          <IconLoading />
        </template>
      </Suspense>

    </div>

  </div>

  <BackHomeButton />
</template>

<style lang="scss" scoped>

</style>
