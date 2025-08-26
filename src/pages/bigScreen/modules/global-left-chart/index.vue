<!------  2025-08-26---01:24---星期二  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import BulkCommoditySalesChart from './BulkCommoditySalesChart.vue'

import DistrictEconomicIncome from './DistrictEconomicIncome.vue'

import EconomicTrendChart from './EconomicTrendChart.vue'

import YearlyEconomyTrend from './YearlyEconomyTrend.vue'
</script>

<template>
  <div
    class="left-wrap absolute bottom-12 left-8 top-31 z-4 w-100 perspective-origin-[50%_50%] !perspective-[500px]"
  >
    <div
      class="left-wrap-3d absolute bottom-0 left-0 right-0 top-0 z-4 flex flex-col"
      :style="{
        transform: 'translate3d(0px, 0px, 0px) scaleX(1) scaleY(1) rotateX(0deg) rotateY(6deg) rotateZ(0deg) skewX(0deg) skewY(0deg)',
      }"
    >
      <!-- 大宗商品销售额 -->
      <BulkCommoditySalesChart />

      <!-- 年度经济增长点 -->
      <YearlyEconomyTrend />

      <!-- 近年经济情况 -->
      <EconomicTrendChart />

      <!-- 各区经济收益 -->
      <DistrictEconomicIncome />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .left-wrap {
  // position: absolute;
  // z-index: 4;
  // width: 398px;
  // left: 32px;
  // top: 126px;
  // bottom: 50px;
  // perspective: 500px;
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
    // transform: translate3d(0px, 0px, 0px) scaleX(1) scaleY(1) rotateX(0deg) rotateY(6deg) rotateZ(0deg) skewX(0deg)
    //   skewY(0deg);
    // z-index: 4;
    .left-card {
      // flex: 1;
      // margin-bottom: 12px;
    }
  }
}
</style>
