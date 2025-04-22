<script setup lang="ts">
import TypeIt from 'typeit'

import { onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  speed?: number
  values?: string[]
  className?: string
  cursor?: boolean
}>(), {
  speed: 200,
  values: () => [],
  className: 'type-it',
  cursor: true,
})

// /**
//  * @typedef Props
//  * @property {number} speed 打字速度（ms）
//  * @property {string[]} values 打印内容数组
//  * @property {string} className 容器类名
//  * @property {boolean} cursor 是否显示光标
//  */

/** props 定义 */
// defineProps<{
//   /** 打字速度，以每一步之间的毫秒数为单位 */
//   speed?: number
//   /** 需要打字的字符串数组 */
//   values?: string[]
//   /** 容器的类名，用于选择器绑定 */
//   className?: string
//   /** 是否显示光标 */
//   cursor?: boolean
// }>()

const elRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (elRef.value) {
    new TypeIt(elRef.value, {
      strings: props.values,
      speed: props.speed,
      cursor: props.cursor,
    }).go()
  }
})
</script>

<template>
  <span
    ref="elRef"
    :class="props.className"
  />
</template>
