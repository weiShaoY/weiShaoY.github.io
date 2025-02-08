<script lang="ts" setup>
import type { TimeType } from '@/hooks/use-get-time'

import type { DigitNum } from './digit.vue'

import Digit from './digit.vue'

import Separator from './separator.vue'

const props = defineProps({
  /**
   *  时间对象
   */
  time: {
    type: Object as PropType<TimeType>,
    required: true,
  },

  /**
   *  颜色
   */
  color: {
    type: String,
    default: '#fff',
  },

  /**
   *  是否24小时制
   */
  is24Hour: {
    type: Boolean,
    default: true,
  },
})

function mathNum(
  number: number = 0,
  bool: boolean = true,
): DigitNum {
  return bool
    ? (Math.floor(number / 10) as unknown as DigitNum)
    : ((number % 10) as unknown as DigitNum)
}

const hour = computed(() => {
  return props.is24Hour ? props.time.hour24 : props.time?.hour12
})
</script>

<template>
  <div
    class="max-w-full flex items-center justify-center gap-1 px-2 md:gap-2 md:px-0"
  >
    <Digit
      :number="mathNum(hour)"
      :color="color"
    />

    <Digit
      :number="mathNum(hour, false)"
      :color="color"
    />

    <Separator
      :number="time.second || 0"
      :color="color"
    />

    <Digit
      :number="mathNum(time.minute)"
      :color="color"
    />

    <Digit
      :number="mathNum(time.minute, false)"
      :color="color"
    />

    <Separator
      :number="time.second || 0"
      :color="color"
    />

    <Digit
      :number="mathNum(time.second)"
      :color="color"
    />

    <Digit
      :number="mathNum(time.second, false)"
      :color="color"
    />
  </div>
</template>
