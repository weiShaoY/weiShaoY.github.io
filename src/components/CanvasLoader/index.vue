<script setup lang="ts">
/**
 * 组件属性类型定义
 */
type Props = {

  /**
   * 是否显示 loading
   */
  isLoading: boolean
}

/**
 * 组件属性默认值
 */
const props = withDefaults(defineProps<Props>(), {
})
</script>

<template>
  <div
    class="relative h-full w-full"
  >
    <Loading
      v-if="!props.isLoading"
      class="absolute left-1/2 top-1/2 z-1 -translate-x-1/2 -translate-y-1/2"
    />

    <div
      class="h-full w-full transition-opacity duration-300"
      :class="props.isLoading ? 'opacity-100' : 'opacity-0'"
    >
      <slot />
    </div>
  </div>
</template>
