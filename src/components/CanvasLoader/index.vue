<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
</script>

<template>
  <div
    class="h-full w-full"
  >
    <slot />
  </div>

  <div
    class="h-full w-full"
  >
    <!-- 这里是加载动画的具体内容 -->
    <a-spin
      :size="50"
    />
  </div>
</template>

<style lang="less" scoped>

</style>
