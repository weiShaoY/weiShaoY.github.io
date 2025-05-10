<!------------------------------------  手机展示  ------------------------------------------------->
<script lang="ts" setup>
import type { SettingType } from './index.vue'

const props = defineProps<{

  /**
   *  设置
   */
  setting: SettingType
}>()
</script>

<template>
  <div
    class="phone-wrap h-[812px] w-[375px]"
  >
    <div
      class="phone-content origin-[0_0] scale-33.333 border border-[#f1f1f1] border-solid"
    >
      <div
        id="phone"
        class="phone relative z-998 h-[2436px] w-[1125px] bg-[#ededed] text-[36px]"
      >
        <div
          class="phone-top relative z-99999 bg-[#ededed]"
        >
          <div
            class="phone-bar h-[132px] flex items-center p-l-[43px] p-r-[95px]"
          >
            <!-- 手机时间 -->
            <div
              class="phone-time flex-1 text-[45px] font-semibold"
            >
              {{ setting.appearance.phoneTime }}
            </div>

            <!-- 手机信号 -->
            <div
              class="phone-sigle phone-sigle mr-[6px] h-[36px] h-[36px] w-[54px] w-[54px] bg-no-repeat indent--9999px"
              :class="[
                { 'phone-sigle-v1': setting.appearance.phoneSignal === 1 },
                { 'phone-sigle-v2': setting.appearance.phoneSignal === 2 },
                { 'phone-sigle-v3': setting.appearance.phoneSignal === 3 },
                { 'phone-sigle-v4': setting.appearance.phoneSignal === 4 },
              ]"
            >
              信号333333333333
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// .phone-sigle {
//   width: 54px;
//   height: 36px;
//   background: url(./images/bar/ios-single-4-dark.png) no-repeat;
//   margin-right: 6px;
//   text-indent: -9999px;
// }

.phone-sigle-v1 {
  background-image: url(./images/bar/ios-single-1-dark.png);
}

.phone-sigle-v2 {
  background-image: url(./images/bar/ios-single-2-dark.png);
}

.phone-sigle-v3 {
  background-image: url(./images/bar/ios-single-3-dark.png);
}

.phone-sigle-v4 {
  background-image: url(./images/bar/ios-single-4-dark.png);
}
</style>
