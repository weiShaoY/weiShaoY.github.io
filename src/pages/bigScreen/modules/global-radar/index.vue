<!------  2025-08-26---01:09---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import img_radarBg from '@/assets/images/bigScreen/radar-bg.png'

import img_radarSaomiao from '@/assets/images/bigScreen/radar-saomiao.png'
</script>

<template>
  <div
    class="bottom-tray absolute bottom-25 right-125 z-3"
  >
    <div
      class="m-radar"
    >
      <img
        class="m-radar-bg"
        :src="img_radarBg"
        alt=""
      >

      <img
        class="m-radar-saomiao"
        :src="img_radarSaomiao"
        alt=""
      >

    </div>
  </div>
</template>

<style lang="scss" scoped>
.m-radar {
  position: relative;
  width: 92px;
  height: 92px;
  &-bg {
    width: 92px;
    height: 92px;
  }
  &-saomiao {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -39px;
    margin-top: -39px;
    width: 79px;
    height: 79px;
    animation: rotate360Animate 3s linear infinite;
  }
}
</style>
