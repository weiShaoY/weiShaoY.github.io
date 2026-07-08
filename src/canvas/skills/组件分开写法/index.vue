<script setup lang="ts">

// 引入工具方法
import { skillsList } from '@/configs'

import Item from './item.vue'

</script>

<template>
  <div
    class="grid grid-cols-3 h-full place-items-center gap-2 sm:grid-cols-6"
  >
    <div
      v-for="(tech) in skillsList"
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
