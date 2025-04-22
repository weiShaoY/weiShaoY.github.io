<script lang="ts" setup>
import type { Options } from 'typeit'

import type { El } from 'typeit/dist/types'

import { twMerge } from 'tailwind-merge'

import TypeIt from 'typeit'

import { onMounted, shallowRef } from 'vue'

defineOptions({
  name: 'TypeIt',
})

const props = withDefaults(defineProps<Props>(), {
  values: () => [],
  class: '',
  speed: 100,
  cursor: false,
  loop: false,
})

type Props = {

  /*
   * 打印内容数组
   */
  values: string[]

  /**
   *  额外的 CSS 类名
   */
  class?:
    | string
    | Record<string, boolean>
    | Array<string | Record<string, boolean>>

  /*
   * 打字速度（ms）
   */
  speed?: number

  /*
   * 是否显示光标
   */
  cursor?: boolean

  /*
   * 是否循环
   */
  loop?: boolean
}

/**
 * 基础类名
 */
const BASE_CLASSES = ''

/**
 * 计算合并后的类名
 * 现在支持字符串、对象和数组形式的class
 */
const computedClass = computed(() => {
  // 处理字符串形式的class
  if (typeof props.class === 'string') {
    return twMerge(BASE_CLASSES, props.class)
  }

  // 处理对象或数组形式的class
  if (props.class) {
    return [BASE_CLASSES, props.class]
  }

  return BASE_CLASSES
})

const textRef = shallowRef<El>()

function init() {
  if (!textRef.value) {
    return
  }

  const options: Options = {
    strings: props.values,
    speed: props.speed,
    cursor: props.cursor,
    loop: props.loop,
  }

  const initTypeIt = new TypeIt(textRef.value, options)

  initTypeIt.go()
}

onMounted(() => {
  init()
})
</script>

<template>
  <span
    ref="textRef"
    :class="computedClass"
  />
</template>

<style scoped></style>
