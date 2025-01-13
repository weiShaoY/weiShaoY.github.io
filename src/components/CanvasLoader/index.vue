<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  /**
   *  是否加载完成
   */
  isLoaded: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>

  <div
    class="relative !h-full !w-full"
  >
    <a-spin
      v-if="!isLoaded"
      :size="50"
      class="absolute left-1/2 top-1/2 z-1 color-[#F3B03D] -translate-x-1/2 -translate-y-1/2"
    />

    <div
      class="h-full w-full"
      :class="isLoaded ? 'opacity-100' : 'opacity-0'"
    >
      <slot />

    </div>

  </div>
</template>
