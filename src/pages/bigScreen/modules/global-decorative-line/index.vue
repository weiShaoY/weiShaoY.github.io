<!------  2025-08-26---00:45---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import svg_leftKuang from '@/assets/svgs/bigScreen/left-kuang.svg'

import svg_rightKuang from '@/assets/svgs/bigScreen/right-kuang.svg'
</script>

<template>
  <div
    class="left-zsline bkAnimateAnimate absolute left-0 top-1/2 z-[3] mt-[-540px] h-[1080px] w-[120px] bg-contain bg-no-repeat"
    :style="{
      backgroundImage: `url(${svg_leftKuang})`,
    }"
  />

  <div
    class="right-zsline bkAnimateAnimate absolute right-0 top-1/2 z-[3] mt-[-540px] h-[1080px] w-[120px] bg-contain bg-no-repeat"
    :style="{
      backgroundImage: `url(${svg_rightKuang})`,
    }"
  />
</template>

<style lang="scss" scoped>

.bkAnimateAnimate {
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
