<script setup lang="ts">
import { computed } from 'vue'

type Props = {

  /**
   *  图标名称
   */
  icon: string

  /**
   *  图标大小
   */
  size?: string | number

  /**
   *  图标类名
   *  @description 如果传入 color属性 则不能传入的class里的颜色不会生效, 因为 fill 会被覆盖
   */
  class?: string

  /**
   *  图标颜色
   */
  color?: string

  /**
   *  图标前缀
   */
  prefix?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  size: '20px',
  class: '',
  color: '',
  prefix: '#icon-',
})

// 4. 计算图标大小
const svgSize = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`
  }

  return props.size
})
</script>

<template>
  <svg
    :class="`fill-current ${props.class} w-1em h-1em relative`"
    :font-size="svgSize"
  >
    <use
      :xlink:href="`${props.prefix}${props.icon}`"
      :fill="`${props.color}`"
    />
  </svg>
</template>
