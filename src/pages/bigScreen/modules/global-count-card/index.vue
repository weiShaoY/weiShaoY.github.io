<!------  2025-08-25---22:17---星期一  ------>
<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import img_count_icon1 from '@/assets/images/bigScreen/count-icon1.png'

import img_count_icon2 from '@/assets/images/bigScreen/count-icon2.png'

import { mCountTo } from '../../components'

type itemType = {

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
}

const totalView = ref<itemType[]>([
  {
    icon: img_count_icon1,
    zh: '2025年总案件数',
    en: 'Total number of cases in 2025',
    value: 82,
    unit: '件',
    decimals: 0,
  },
  {
    icon: img_count_icon2,
    zh: '2025已结案数',
    en: 'Total number of cases in 2025',
    value: 60,
    unit: '件',
    decimals: 0,
  },
])

function toUpper(text: string) {
  return text.toUpperCase()
}
</script>

<template>
  <div
    class="top-count-card absolute left-140 right-140 top-32 z-9 flex justify-center"
  >
    <div
      v-for="(info, index) in totalView"
      :key="index"
      class="count-card flex items-center px-12"
    >
      <div
        class="count-card-left flex items-center"
      >
        <div
          class="count-card-icon mr-3 h-15 w-15 bg-center bg-no-repeat !bg-[length:100%]"
          :style="{
            backgroundImage: `url(${info.icon})`,
          }"
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

</style>
