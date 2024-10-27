<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function back() {
  router.push('/')
}
</script>

<template>
  <div
    class="absolute left-50% top-50% text-center -m-l-25 -m-t-30"
  >
    <a-result
      status="404"
      subtitle="页面未找到"
    />

    <a-button
      key="back"
      type="primary"
      @click="back"
    >
      back
    </a-button>
  </div>
</template>

<style scoped lang="less">

</style>
