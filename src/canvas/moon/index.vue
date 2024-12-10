<!------------------------------------  月球  ------------------------------------------------->
<script lang="ts" setup>
import earthFlyLine from 'earth-flyline' // 确保库名和导入路径正确

import { onMounted, ref } from 'vue'

import imageUrl from './image/bumpImage.jpeg'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (container.value) {
    earthFlyLine.init({
      dom: container.value,
      config: {

        texture: {
          path: imageUrl,
          mixed: false,
        },
        bgStyle: {
          color: '#0e0c15',
          opacity: 0,
        },
        spriteStyle: {
          color: '#fff',
          show: false,
        },

        // 是否允许滚轮放大缩小
        enableZoom: false,

      },

    })
  }
})
</script>

<template>
  <div
    ref="container"
    class="h-[400px] w-[400px] overflow-hidden"
  />
</template>
