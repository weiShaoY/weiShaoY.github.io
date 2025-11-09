/**
 *  打字组件
 */
<script lang="ts" setup>
import type { Options } from 'typeit'

import type { El } from 'typeit/dist/types'

import { twMerge } from 'tailwind-merge'

import TypeIt from 'typeit'

import {
  computed,
  onMounted,
  shallowRef,
} from 'vue'

defineOptions({
  name: 'TypeIt',
})

/** 组件 props，带默认值 */
const props = withDefaults(defineProps<Props>(), {
  class: '',
  speed: 100,
  cursor: false,
  loop: false,
})

/**
 * 组件 Props 定义
 */
type Props = {

  /**
   * 打印内容字符串数组
   */
  stringList: string[]

  /**
   * 附加的 CSS 类名
   * 支持 string、对象、数组的格式
   */
  class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>

  /**
   * 打字速度（毫秒/每字符），默认 100ms
   */
  speed?: number

  /**
   * 是否显示光标，默认 false
   */
  cursor?: boolean

  /**
   * 是否循环播放，默认 false
   */
  loop?: boolean
}

/**
 * 基础类名
 */
const BASE_CLASSES = ''

/**
 * 合并后的类名
 * 支持字符串、对象、数组形式
 */
const computedClass = computed(() => {
  if (typeof props.class === 'string') {
    return twMerge(BASE_CLASSES, props.class)
  }

  if (Array.isArray(props.class)) {
    const merged = props.class
      .map((item) => {
        if (typeof item === 'string') {
          return item
        }

        return Object.entries(item)
          .filter(([, active]) => active)
          .map(([key]) => key)
          .join(' ')
      })
      .join(' ')

    return twMerge(BASE_CLASSES, merged)
  }

  if (typeof props.class === 'object' && props.class !== null) {
    const merged = Object.entries(props.class)
      .filter(([, active]) => active)
      .map(([key]) => key)
      .join(' ')

    return twMerge(BASE_CLASSES, merged)
  }

  return BASE_CLASSES
})

/** 文本容器 DOM 引用 */
const textRef = shallowRef<El>()

/**
 * 初始化 TypeIt 打字机效果
 */
function init() {
  if (!textRef.value) {
    return
  }

  const options: Options = {
    strings: props.stringList,
    speed: props.speed,
    cursor: props.cursor,
    loop: props.loop,
  }

  const typeitInstance = new TypeIt(textRef.value, options)

  typeitInstance.go()
}

// 生命周期钩子：挂载后初始化
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
