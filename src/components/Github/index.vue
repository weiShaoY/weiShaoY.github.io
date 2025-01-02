<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>

import { openUrlInWindow } from '@/utils'

const props = defineProps({

  /**
   *  颜色
   */
  color: {
    type: String,
    default: 'white',
  },

  /**
   *  大小
   */
  size: {
    type: Number,
    default: 34,
  },
})

function handleClick() {
  openUrlInWindow('https://github.com/weiShaoY')
}
</script>

<template>
  <SvgIcon
    class="transform cursor-pointer transition-transform duration-500 hover:-translate-y-1"
    icon="github"
    :size="props.size"
    :style="{
      color: props.color,
    }"
    @click="handleClick"
  />
</template>

<style lang="less" scoped>

</style>
