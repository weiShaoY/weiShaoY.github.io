<!------------------------------------  首页模块  ------------------------------------------------->
<script lang="ts" setup>
import { layoutConfig } from '@/configs'

import GlobalHeader from './modules/global-header/index.vue'
</script>

<template>
  <div
    class="h-screen w-full flex flex-col bg-[#212224] color-[#e4e4e6]"
  >
    <!-- 顶部导航栏 -->
    <GlobalHeader />

    <div
      class="mt-20 w-full overflow-auto"
      :style="{
        height: `calc(100vh - ${layoutConfig.default.headerHeight}px)`,
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
</template>
