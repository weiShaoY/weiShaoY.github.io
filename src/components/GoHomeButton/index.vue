<!------------------------------------  返回首页按钮  ------------------------------------------------->
<script lang="ts" setup>
</script>

<template>
  <div
    class="fixed bottom-5 left-5 z-1000"
  >
    <BaseButton
      tooltip-content="返回首页"
      icon="return"
      @click="$router.push('/')"
    />
  </div>

</template>

<style lang="less" scoped>

</style>
