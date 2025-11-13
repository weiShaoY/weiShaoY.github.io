<!------------------------------------    ------------------------------------------------->
<script lang="ts" setup>
import { twMerge } from 'tailwind-merge'

import { useRouter } from 'vue-router'

type LogoPropsType = {

  /**
   *  颜色
   *  @default white
   */
  color?: string

  /**
   *  大小
   *  @default 120
   */
  size?: number

  /**
   *  跳转路径
   *  @default /
   */
  url?: string

  /**
   *  按钮的 class 类名
   */
  class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>

}

const props = withDefaults(defineProps<LogoPropsType>(), {
  color: 'white',
  size: 120,
  url: '/',
})

/**
 * 默认按钮类
 */
const DEFAULT_CLASS = 'flex items-center gap-2 hover:cursor-pointer c-amber'

/**
 * 处理 class，兼容多种格式
 * @param input - 输入的类
 * @returns 拼接后的类字符串
 */
function stringifyClass(input?: string | Record<string, boolean> | Array<string | Record<string, boolean>>): string {
  if (!input) {
    return ''
  }

  if (typeof input === 'string') {
    return input
  }

  if (Array.isArray(input)) {
    return input
      .map(item => stringifyClass(item))
      .filter(Boolean)
      .join(' ')
  }

  return Object.entries(input)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(' ')
}

/**
 * 计算按钮的最终类名
 */
const computedClass = computed(() => twMerge(DEFAULT_CLASS, stringifyClass(props.class)))

const router = useRouter()

function handleClick() {
  router.push(props.url)
}
</script>

<template>
  <a
    class=""
    :class="computedClass"
    @click="handleClick"
  >
    <SvgIcon
      icon="weiShaoY"
      :size="props.size"
      :style="{
        color: props.color,
      }"
    />

  </a>
</template>

<style lang="scss" scoped>

</style>
