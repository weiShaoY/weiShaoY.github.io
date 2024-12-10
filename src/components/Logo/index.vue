<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function handleClick() {
  // 判断当前路由地址是不是 '/home'
  if (router.currentRoute.value.path === import.meta.env.VITE_APP_HOMEPAGE) {
    return
  }

  router.push('/home')
}
</script>

<template>
  <a
    class="flex items-center gap-2 hover:cursor-pointer"
    @click="handleClick"
  >
    <SvgIcon
      icon="logo"
      size="60"
    />

    <SvgIcon
      icon="weiShaoY"
      size="120"
      class="!text-white"
    />

  </a>
</template>

<style lang="less" scoped>

</style>
