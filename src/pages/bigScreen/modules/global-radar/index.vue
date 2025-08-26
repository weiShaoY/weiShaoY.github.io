<!------  2025-08-26---01:09---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import img_radarBg from '@/assets/images/bigScreen/radar-bg.png'

import img_radarSaomiao from '@/assets/images/bigScreen/radar-saoMiao.png'
</script>

<template>
  <div
    class="bottom-tray absolute bottom-25 right-125 z-3"
  >
    <div
      class="m-radar relative h-24 w-24"
    >
      <img
        class="m-radar-bg h-24 w-24"
        :src="img_radarBg"
        alt=""
      >

      <img
        class="m-radar-saomiao absolute left-1/2 top-1/2 z-[-1] h-20 w-20 -ml-10 -mt-10"
        :src="img_radarSaomiao"
        alt=""
        :style="{
          animation: 'rotate360Animate 3s linear infinite',
        }"
      >

    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
