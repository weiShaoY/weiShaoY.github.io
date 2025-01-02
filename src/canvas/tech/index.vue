<script setup lang="ts">

// 引入工具方法
import { techStack } from '@/utils'

import Item from './item.vue'

// 定义技术栈数据
const technologies = [
  techStack.html,
  techStack.css,
  techStack.javaScript,
  techStack.typeScript,
  techStack.node,
  techStack.react,
  techStack.vue,
  techStack.tailwindCss,
  techStack.unocss,
  techStack.threeJs,
  techStack.git,
  techStack.pinia,
]

</script>

<template>
  <div
    class="grid grid-cols-3 h-full place-items-center gap-2 sm:grid-cols-6"
  >
    <div
      v-for="(tech) in technologies"
      :key="tech.name"
      class="h-20 w-20"
    >
      <Item
        :image-url="tech.image"
        :document="tech.document"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
/* 设置 canvas 的样式 */
canvas {
  display: block; // 确保 canvas 为块级元素
}
</style>
