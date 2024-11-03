<script lang="ts" setup>
import type { DigitNum } from './index.vue'

import matrixNum from './data'

type MatrixNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

const props = defineProps({

  /**
   *  @param number
   *    数字
   */
  number: {
    type: Number,
    default: 0,
  },

  /**
   *  颜色
   */
  color: {
    type: String,
    default: '#fff',
  },
})

const matrix = ref(matrixNum[0])

function renderDigit(number: MatrixNum = 0) {
  matrix.value = matrixNum[number]
}

watchEffect(() => {
  renderDigit(props.number as DigitNum)
})
</script>

<template>
  <div
    class="grid grid-cols-4 scale-75 transform gap-1.5 md:scale-100"
  >
    <i
      v-for="(i, j) in matrix"
      :key="j"
      class="h-2.5 w-2.5 rounded-sm transition-all"
      :style="{
        backgroundColor: color,
        opacity: i ? 1 : 0.2,
      }"
    />
  </div>
</template>
