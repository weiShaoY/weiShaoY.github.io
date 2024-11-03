<script setup lang="ts">

import { ref, watch } from 'vue'

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

const refresh = ref<boolean>(true)

watch(
  () => props.number,
  () => {
    refresh.value = !refresh.value
  },
)
</script>

<template>
  <div
    class="h-25 flex flex-col justify-around"
  >
    <i
      class="block h-1.5 w-1.5 rounded transition-all"
      :style="{
        backgroundColor: color,
        opacity: refresh ? 1 : 0.2,
      }"
    />

    <i
      class="block h-1.5 w-1.5 rounded transition-all"
      :style="{
        backgroundColor: color,
        opacity: refresh ? 1 : 0.2,
      }"
    />
  </div>
</template>
