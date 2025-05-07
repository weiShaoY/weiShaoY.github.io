<script lang="ts" setup>
import { openUrlInWindow } from '@/utils'

/**
 * GitHub 组件属性类型
 */
type GithubPropsType = {

  /** 图标颜色 */
  color?: string

  /** 图标大小 */
  size?: number

  /** 是否禁用 */
  disabled?: boolean

  /** 提示文本 */
  tooltipContent?: string
}

const props = withDefaults(defineProps<GithubPropsType>(), {
  color: 'white',
  size: 34,
  disabled: false,
  tooltipContent: '访问 GitHub',
})

const githubUrl = import.meta.env.VITE_GITHUB_URL

/**
 * 处理点击事件
 * @param event - 鼠标事件
 */
function handleClick(event: MouseEvent) {
  if (props.disabled) {
    return
  }

  // 如果是中键点击，让浏览器默认行为处理
  if (event.button === 1) {
    return
  }

  // 其他点击行为使用自定义处理
  event.preventDefault()
  openUrlInWindow(githubUrl)
}
</script>

<template>
  <BaseButton
    class="transform transition-transform duration-500 hover:-translate-y-1"
    :class="[
      { 'opacity-50 cursor-not-allowed': disabled },
    ]"
    icon="github"
    :size="size"
    :tooltip-content="tooltipContent"
    :disabled="disabled"
    :style="{
      color,
    }"
    @click="handleClick"
  />
</template>
