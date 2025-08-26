<script setup lang="ts">
import img_headerBg from '@/assets/images/bigScreen/header-bg.png'
</script>

<template>
  <div
    class="m-header relative left-0 right-0 top-0 z-2 h-22 w-full"
  >
    <div
      class="m-header-wrap absolute left-1/2 mx-auto box-border h-[90px] w-[1920px] pt-[10px] text-center -translate-x-1/2 !bg-[length:100%]"
      :style="{
        backgroundImage: `url(${img_headerBg})`,
      }"
    >
      <div
        class="m-header-title from-[rgba(117,232,255,1)] to-[rgba(255,255,255,1)] bg-gradient-to-b bg-clip-text bg-clip-text text-11 text-transparent tracking-[1px]"
      >
        湖南省国安厅作战指挥平台
      </div>

    </div>

    <div
      class="absolute left-[32px] top-[47px] flex items-center gap-3 text-[#c4f3fe] font-[14px]"
    >
      <span>小雨</span>

      <span>27℃</span>
    </div>

    <div
      class="absolute right-[32px] top-[47px] flex items-center gap-3 text-[#c4f3fe] font-[14px]"
    >
      <span>2023-10-12</span>

      <span>17:53:16</span>
    </div>

    <div>
      <mSvglineAnimation
        class="absolute right-[50%] top-[11px] mr-[14px] h-[79px] w-[961px]"
        :width="961"
        :height="79"
        color="#30DCFF"
        :stroke-width="2"
        :dir="[0, 1]"
        :length="100"
        path="M1 1.52783L535 25.6808C552.73 26.5835 571.454 31.3851 588.834 39.2194C593.758 41.4385 598.692 43.7289 603.643 46.0273C633.567 59.9182 664.121 74.1016 696.754 74.6262C696.765 74.6264 696.775 74.6265 696.786 74.6267C821.602 76.5993 879.336 78 961 78"
      />

      <mSvglineAnimation
        class="absolute left-[50%] top-[11px] ml-[-14px] h-[79px] w-[961px] scale-x-[-1] transform"
        :width="961"
        :height="79"
        color="#30DCFF"
        :stroke-width="2"
        :dir="[0, 1]"
        :length="100"
        path="M1 1.52783L535 25.6808C552.73 26.5835 571.454 31.3851 588.834 39.2194C593.758 41.4385 598.692 43.7289 603.643 46.0273C633.567 59.9182 664.121 74.1016 696.754 74.6262C696.765 74.6264 696.775 74.6265 696.786 74.6267C821.602 76.5993 879.336 78 961 78"
      />

    </div>
  </div>
</template>

<style lang="scss">

</style>
