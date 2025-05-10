<!------------------------------------  手机展示  ------------------------------------------------->
<script lang="ts" setup>
import type { SettingType } from './index.vue'

import { computed } from 'vue'

const props = defineProps<{

  /**
   *  设置
   */
  setting: SettingType
}>()

const signalImageUrl = computed(() => {
  return new URL(
    `./images/bar/ios-single-${props.setting.appearance.phoneSignal}-dark.png`,
    import.meta.url,
  ).href
})
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
              :style="{
                backgroundImage: `url(${signalImageUrl})`,
              }"
            >
              <!-- 手机信号 -->
            </div>

            <div
              class="phone-wifi"
              :class="[
                { 'phone-wifi-v2': setting.appearance.networkSignal > 1 },
                setting.appearance.networkSignal === 1 ? `phone-wifi-s${setting.appearance.wifiSignal}` : '',
              ]"
            >
              <template
                v-if=" setting.appearance.networkSignal === 1"
              >
                wifi
              </template>

              <template
                v-else-if=" setting.appearance.networkSignal === 2"
              >
                3G
              </template>

              <template
                v-else-if=" setting.appearance.networkSignal === 3"
              >
                4G
              </template>

              <template
                v-else-if=" setting.appearance.networkSignal === 4"
              >
                5G
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.phone-wifi {
  width: 63px;
  height: 45px;
  background: url(./images/bar/ios-wifi-3-dark.png) no-repeat;
  margin-right: 6px;
  text-indent: -9999px;
}

.phone-wifi-s1 {
  background-image: url(./images/bar/ios-wifi-1-dark.png);
}

.phone-wifi-s2 {
  background-image: url(./images/bar/ios-wifi-2-dark.png);
}

.phone-wifi-v2 {
  text-indent: 0;
  background-image: none;
  font-size: 36px;
  font-weight: 500;
  text-align: center;
  height: auto;
}
</style>
