<script lang="ts" setup>

import { useRouter } from 'vue-router'

const router = useRouter()

function back() {
  router.push('/')
}
</script>

<template>
  <div
    class="absolute left-1/2 top-1/2 max-w-[400px] -translate-x-1/2 -translate-y-1/2"
  >
    <div
      class="flex flex-col items-center justify-center px-2"
    >
      <div
        class="m-b-3 text-center text-2xl color-[#1F1F1F] font-semibold"
      >
        403! 没有权限！
      </div>

      <div
        class="text-center color-[#A4A4A4]"
      >
        您尝试访问的页面已限制访问.请联系您的系统管理员!
      </div>

      <div
        class=""
      >
        <SvgIcon
          icon="error-403"
          :size="400"
        />
      </div>

      <button
        key="back"
        class="rounded-md bg-black p-4 text-xl color-white font-semibold"
        @click="back"
      >
        转至主页
      </button>
    </div>

  </div>
</template>

<style scoped lang="scss">

</style>
