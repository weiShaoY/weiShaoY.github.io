<!------------------------------------  技术栈  ------------------------------------------------->
<script lang="ts" setup>
import { techStack } from '@/utils'

import Ball from './ball.vue'

/**
 * 技术栈数据
 */
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
      v-for="tech in technologies"
      :key="tech.name"
      class="h-22 w-22"
    >
      <Ball
        :imageUrl="tech.image"
        :url="tech.url"
      />
    </div>
  </div>
</template>
