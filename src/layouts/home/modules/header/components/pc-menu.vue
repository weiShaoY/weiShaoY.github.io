<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

type PropsType = {

  /**
   *  菜单列表
   */
  menuList: {
    value: string
    label: string
  }[]
}

defineProps<PropsType>()

const route = useRoute()

const router = useRouter()

/**
 * 选择菜单项
 * @param  key - 路由路径
 */
function handleSelect(key: string) {
  router.push(key) // 使用 Vue Router 跳转
}

const websiteUrl = import.meta.env.VITE_WEBSITE_URL

const isDevelopment = import.meta.env.VITE_APP_NODE_ENV === 'development'
</script>

<template>
  <div
    class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center gap-5"
  >
    <div
      v-for="item in menuList"
      :key="item.value"
      class="flex cursor-pointer items-center text-lg text-[#D0D2D6] font-bold hover:text-primary"
      :class="{
        'text-primary': route.path === item.value,
      }"
      @click="handleSelect(item.value)"
    >
      {{ item.label }}
    </div>
  </div>

  <div
    class="flex flex-1 items-center justify-end gap-5"
  >
    <Github />

    <LinkButton
      v-if="isDevelopment"
      icon="home-navbar-demo"
      :size="34"
      :url="websiteUrl"
    />
  </div>
</template>
