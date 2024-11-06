<script lang="ts" setup>
import digitNum from './data'

export type DigitNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

const props = defineProps({

  /**
   *  @param number
   *    数字
   */
  number: {
    type: Number,
    required: true,
  },

  /**
   *  颜色
   */
  color: {
    type: String,
    default: '#fff',
  },
})

// 当前所有segment状态，true为亮起，false为熄灭
const segmentsOn = ref<boolean[]>([false, false, false, false, false, false, false])

function changeSegment() {
  const newSeg = segmentsOn.value.map(() => false)

  digitNum[props.number as DigitNum].forEach((i: number) => {
    newSeg[i] = true
  })

  segmentsOn.value = newSeg
}

watchEffect(() => {
  changeSegment()
})
</script>

<template>
  <div
    class="relative mx-1 h-25 w-14 flex-shrink flex-grow-0 scale-75 transform md:scale-100"
  >
    <i
      v-for="(segment, index) in segmentsOn"
      :key="index"
      class="absolute block rounded opacity-20 transition-opacity"
      :style="{
        backgroundColor: color,
      }"
      :class="[
        {
          '!opacity-100': segment,
          'h-1.5': index === 0 || index === 3 || index === 6,
          'w-1.5 h-10': index === 1 || index === 2 || index === 4 || index === 5,
          'top-1': index === 0,
          'top-2': index === 1 || index === 5,
          'left-1': index === 4 || index === 5,
          'left-2': index === 0 || index === 3 || index === 6,
          'right-1': index === 1 || index === 2,
          'right-2': index === 0 || index === 3 || index === 6,
          'bottom-1': index === 3,
          'bottom-2': index === 2 || index === 4,
          'bottom-1/2 -mb-0.75': index === 6,
        },
      ]"
    />
  </div>
</template>
