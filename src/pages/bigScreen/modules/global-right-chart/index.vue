<!------  2025-08-26---09:25---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import ElectricityUsage from './ElectricityUsage.vue'

import ProportionPopulationConsumption from './ProportionPopulationConsumption.vue'

import PurposeSpecialFunds from './PurposeSpecialFunds.vue'

import QuarterlyGrowthSituation from './QuarterlyGrowthSituation.vue'
</script>

<template>
  <div
    class="right-wrap absolute bottom-12 right-8 top-31 z-4 w-100 perspective-origin-[50%_50%] !perspective-[500px]"
  >
    <div
      class="right-wrap-3d absolute bottom-0 left-0 right-0 top-0 z-4 flex flex-col"
      :style="{
        transform: 'translate3d(0px, 0px, 0px) scaleX(1) scaleY(1) rotateX(0deg) rotateY(-6deg) rotateZ(0deg) skewX(0deg) skewY(0deg)',
      }"
    >
      <!-- 用电情况 -->
      <ElectricityUsage />

      <!-- 人群消费占比 -->
      <ProportionPopulationConsumption />

      <!-- 专项资金用途 -->
      <PurposeSpecialFunds />

      <!-- 各季度增长情况 -->
      <QuarterlyGrowthSituation />
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .right-wrap {
  // position: absolute;
  // z-index: 4;
  // width: 398px;
  // right: 32px;
  // top: 126px;
  // bottom: 50px;
  // perspective: 800px;
  // perspective-origin: 50% 50%;
  &-3d {
    // position: absolute;
    // left: 0;
    // top: 0;
    // right: 0;
    // bottom: 0;
    // display: flex;
    // flex-direction: column;
    // // justify-content: space-between;
    // transform: translate3d(0px, 0px, 0px) scaleX(1) scaleY(1) rotateX(0deg) rotateY(-6deg) rotateZ(0deg) skewX(0deg)
    //   skewY(0deg);
    .right-card {
      // flex: 1;
      // margin-bottom: 12px;
    }
  }
}
</style>
