<!------------------------------------  首页模块  ------------------------------------------------->
<script lang="ts" setup>
import Loading from '@/components/Loading/index.vue'

import Header from './components/header/index.vue'
</script>

<template>
  <div
    class="h-full min-h-screen w-full bg-[#212224]"
  >
    <!-- 顶部导航栏 -->
    <Header />

    <!-- 路由切换动画 -->
    <Suspense>
      <template
        #default
      >
        <router-view
          v-slot="{ Component }"
        >
          <Transition
            name="fade-slide"
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
        <Loading />
      </template>
    </Suspense>
  </div>
</template>

<style lang="scss" scoped>
/* 淡入淡出 + 滑动动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(60px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}
</style>
