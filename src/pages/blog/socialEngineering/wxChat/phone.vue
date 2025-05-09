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
    class="h-[812px] w-[375px]"
  >
    <div
      class="origin-[0_0] scale-33.333 border border-[#f1f1f1] border-solid"
    >
      <div
        id="phone"
        class="relative z-998 h-[2436px] w-[1125px] bg-[#ededed] text-[36px]"
      >
        <div
          class="phone-top relative z-99999 bg-[#ededed]"
        >

          <div
            class="phone-bar h-[132px] flex items-center p-l-[43px] p-r-[95px]"
          >

            <div
              class="phone-time text-[45px] font-semibold"
            >
              13:10
            </div>

          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<style lang="less" scoped>

</style>
