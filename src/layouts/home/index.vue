<!------------------------------------  首页模块  ------------------------------------------------->
<script lang="ts" setup>
import Loading from '@/components/Loading/index.vue'

import Header from './modules/header/index.vue'
</script>

<template>
  <div
    class="min-h-screen w-full bg-[#212224] color-[#e4e4e6]"
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
        <Loading />
      </template>
    </Suspense>
  </div>
</template>
