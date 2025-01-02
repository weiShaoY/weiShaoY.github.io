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

    <!-- <RouterView /> -->
    <Suspense>
      <template
        #default
      >
        <router-view />
      </template>

      <template
        #fallback
      >
        <Loading />
      </template>
    </Suspense>

  </div>
</template>

<style lang="less" scoped>

</style>
