<!------  2025-08-26---00:45---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
</script>

<template>
  <div
    class="left-zsline absolute left-0 top-1/2 z-[3] mt-[-540px] h-[1080px] w-[120px] bg-contain"
  />

  <div
    class="right-zsline absolute right-0 top-1/2 z-[3] mt-[-540px] h-[1080px] w-[120px] bg-contain"
  />
</template>

<style lang="scss" scoped>

  .left-zsline {
  background: url('@/assets/svgs/bgScreen/left-kuang.svg') no-repeat;
  animation: bkAnimate 3s infinite;
}
.right-zsline {
  background: url('@/assets/svgs/bgScreen/right-kuang.svg') no-repeat;
  animation: bkAnimate 3s infinite;
}

@keyframes bkAnimate {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>
