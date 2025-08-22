<!------------------------------------  车库  ------------------------------------------------->
<script lang="ts" setup>

import ThreeContainer from './threeContainer/index.vue'

import UiContainer from './uiContainer/index.vue'

</script>

<template>
  <div
    class="aaa relative h-screen"
    :style="{
      transformOrigin: 'top left',
      transform: 'rotate(90deg) translateY(-100%)',
    }"
  >
    <!-- UI界面层 -->
    <UiContainer />

    <!-- 3D场景层 -->
    <ThreeContainer />

    <!-- 回到首页按钮 -->
    <GoHomeButton />
  </div>
</template>

<style lang="scss" scoped>
.aaa {
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotate(-90deg);
  width: 100vh;
  height: 100vh;
  /*去掉overflow 微信显示正常，但是浏览器有问题，竖屏时强制横屏缩小*/
  overflow: hidden;
}
</style>
