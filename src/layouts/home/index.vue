<!------------------------------------  首页模块  ------------------------------------------------->
<script lang="ts" setup>

import Header from './modules/header/index.vue'
</script>

<template>
  <div
    class="h-screen w-full flex flex-col bg-[#212224] color-[#e4e4e6]"
  >
    <!-- 顶部导航栏 -->
    <Header />

    <div
      class="mt-20 h-[calc(100vh-80px)] w-full overflow-auto"
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
