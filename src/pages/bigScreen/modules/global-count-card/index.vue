<!------  2025-08-25---22:17---星期一  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import mCountTo from '@/components/BgScreen/mCountTo/index.js'

type PropsType = {

  /**
   * 卡片信息
   */
  totalView: {

    /**
     * 图标
     */
    icon: string

    /**
     * 中文标题
     */
    zh: string

    /**
     * 英文标题
     */
    en: string

    /**
     * 值
     */
    value: number

    /**
     * 单位
     */
    unit: string

    /**
     * 小数位数
     */
    decimals: number
  }[]
}

defineProps<PropsType>()

function toUpper(text: string) {
  return text.toUpperCase()
}
</script>

<template>
  <div
    class="top-count-card"
  >
    <div
      v-for="(info, index) in totalView"
      :key="index"
      class="count-card flex items-center"
    >
      <div
        class="count-card-left flex items-center"
      >
        <div
          class="count-card-icon mr-12 h-15 w-15 bg-center bg-no-repeat !bg-[length:100%]"
          :class="`icon-${info.icon}`"
        />

        <div
          class="count-card-title"
        >
          <div
            class="whitespace-nowrap text-lg text-white font-bold"
          >
            {{ info.zh }}
          </div>

          <div
            class="title-en pt-[5px]; whitespace-nowrap text-xs text-white font-normal opacity-50"
          >
            {{ toUpper(info.en) }}
          </div>
        </div>
      </div>

      <div
        class="count-card-right flex items-center pl-5"
      >
        <div
          class="value mr-2.5 whitespace-nowrap text-[28px] text-white tracking-[1px] font-[bold]"
        >
          <mCountTo
            :start-val="0"
            :end-val="info.value"
            :decimals="info.decimals"
            :duration="2000"
            separator=""
            :autoplay="true"
          />
        </div>

        <div
          class="unit whitespace-nowrap pt-4 text-3 color-white font-medium opacity-50"
        >
          {{ info.unit }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon-xiaoshoujine {
  background-image: url('../../assets/images/icon1.png');
}
.icon-zongxiaoliang {
  background-image: url('../../assets/images/icon2.png');
}
</style>
