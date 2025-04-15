<script setup lang="ts">
defineOptions({
  name: 'DarkModeContainer',
})

defineProps<Props>()

type Props = {

  /**
   *  深色/浅色模式切换
   */
  inverted?: boolean
}

</script>

<template>
  <div
    class="bg-container text-base-text transition-300"
    :class="{ 'bg-inverted text-[#1f1f1f]': inverted }"
  >
    <slot />
  </div>
</template>

<style scoped></style>
