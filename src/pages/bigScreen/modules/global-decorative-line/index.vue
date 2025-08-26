<!------  2025-08-26---00:45---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import img_leftKuang from '@/assets/svgs/bigScreen/left-kuang.svg'

import img_rightKuang from '@/assets/svgs/bigScreen/right-kuang.svg'
</script>

<template>
  <div
    class="left-zsline absolute left-0 top-1/2 z-[3] mt-[-540px] h-[1080px] w-[120px] bg-contain"
    :style="{
      backgroundImage: `url(${img_leftKuang})`,
      animation: 'bkAnimate 3s infinite',
    }"
  />

  <div
    class="right-zsline absolute right-0 top-1/2 z-[3] mt-[-540px] h-[1080px] w-[120px] bg-contain"
    :style="{
      backgroundImage: `url(${img_rightKuang})`,
      animation: 'bkAnimate 3s infinite',
    }"
  />
</template>

<style lang="scss" scoped>

//   .left-zsline {
//   background: url('@/assets/svgs/bigScreen/left-kuang.svg') no-repeat;
//   animation: bkAnimate 3s infinite;
// }
// .right-zsline {
//   background: url('@/assets/svgs/bigScreen/right-kuang.svg') no-repeat;
//   animation: bkAnimate 3s infinite;
// }

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
