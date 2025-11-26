<script setup lang="ts">
type Props = {

  /**
   * 标题
   */
  title: string

  /**
   * 样式
   */
  style?: Record<string, any>
}

defineProps<Props>()
</script>

<template>
  <p
    class="text-g-800 after:border-g-300 relative mb-5.5 mt-7.5 text-center text-sm after:absolute before:absolute after:right-0 after:top-[10px] before:left-0 before:top-[10px] after:m-auto before:m-auto after:w-[50px] before:w-[50px] after:border-b before:border-b before:border-[var(--art-gray-300)] after:content-[''] before:content-['']"
    :style="style"
  >
    {{ title }}
  </p>
</template>
