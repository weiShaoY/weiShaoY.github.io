<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

type PropsType = {

  /**
   *  菜单列表
   */
  menuList: HomeType.HeaderRouter[]
}

defineProps<PropsType>()

const route = useRoute()

const router = useRouter()

const websiteUrl = import.meta.env.VITE_APP_DEMO_URL

const isDevelopment = import.meta.env.VITE_APP_ENV === 'development'

/**
 * 跳转路由或链接
 */
function handleSelect(item: HomeType.HeaderRouter) {
  if (route.path === item.value) {
    return
  }

  router.push(item.value)
}

</script>

<template>
  <div
    class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-5"
  >
    <span
      v-for="item in menuList"
      :key="item.value"
      class="flex cursor-pointer items-center text-lg text-[#D0D2D6] font-bold hover:text-primary"
      :class="{ 'text-primary': route.path === item.value }"
      @click="handleSelect (item)"
    >
      {{ item.label }}
    </span>
  </div>

  <div
    class="flex flex items-center justify-end gap-5"
  >
    <Github />

    <LinkButton
      v-if="isDevelopment"
      icon="home-navbar-demo"
      :size="36"
      :url="websiteUrl"
    />

    <LinkButton
      v-if="isDevelopment"
      icon="home-navbar-warehouse"
      :size="36"
      url="https://github.com/weiShaoY/weiShaoY.github.io"
    />

  </div>
</template>
