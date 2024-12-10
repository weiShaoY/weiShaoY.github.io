<script lang="ts" setup>
import earthFlyLine from 'earth-flyline' // 确保库名和导入路径正确

import { onMounted, ref } from 'vue'

const imageUrl = '/bumpImage.jpeg'

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

        wallStyle: {
          color: '#RRGGBBAA', // 颜色
        },
        mapStyle: {
          areaColor: '#RRGGBBAA',
        },
        spriteStyle: {
          color: '#797eff',
          show: false,
        },
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
