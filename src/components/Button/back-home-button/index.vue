<!------------------------------------  返回首页按钮  ------------------------------------------------->
<script lang="ts" setup>
</script>

<template>
  <div
    class="fixed bottom-3 left-3 z-1000"
  >
    <BaseButton
      tooltip-content="返回首页"
      icon="return"
      class="color-primary"
      @click="$router.push('/')"
    />
  </div>

</template>

<style lang="scss" scoped>

</style>
