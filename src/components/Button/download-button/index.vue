<!------------------------------------  下载按钮  ------------------------------------------------->
<script setup lang="ts">
import type { Placement } from 'element-plus'

import type { CSSProperties } from 'vue'

import {
  downloadAudio,
  downloadImage,
  downloadVideo,
} from '@/utils'

/**
 * 组件名称
 */
defineOptions({
  name: 'DownloadButton',
  inheritAttrs: false,
})

/**
 * 组件属性默认值
 */
const props = withDefaults(defineProps<Props>(), {
  type: 'image',
  class: '',
  icon: 'blog-download',
  size: 40,
  tooltipContent: '',
  tooltipPlacement: 'bottom',
})

/**
 * 组件事件
 */
const emit = defineEmits<{
  (e: 'click'): void
}>()

/**
 * 文件类型
 */
type FileType = 'image' | 'video' | 'audio'

/**
 * 组件属性类型
 */
type Props = {

  /** 下载地址 */
  url: string

  /** 文件类型 */
  type?: FileType

  /** 图标大小 */
  size?: number

  /** 按钮的 class 类名 */
  class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>

  /** 图标名称 */
  icon?: string

  /** 图标的额外 class */
  iconClass?: string | Record<string, boolean> | Array<string | Record<string, boolean>>

  /** 提示框内容 */
  tooltipContent?: string

  /** 提示框位置 */
  tooltipPlacement?: Placement

  /** 层级 z-index */
  zIndex?: number

  /** 行内样式 */
  style?: CSSProperties

  /** 是否隐藏 tooltip */
  hideTooltip?: boolean
}

/**
 * 是否正在下载
 */
const downloading = ref(false)

/**
 * 下载处理器映射
 */
const downloadHandlers = {
  image: downloadImage,
  video: downloadVideo,
  audio: downloadAudio,
} as const

/**
 * 处理下载逻辑
 */
async function handleDownload(_event: MouseEvent): Promise<void> {
  if (downloading.value) {
    return
  }

  downloading.value = true

  try {
    if (!props.url) {
      throw new Error('下载URL不能为空')
    }

    const handler = downloadHandlers[props.type]

    if (!handler) {
      throw new Error(`不支持的文件类型: ${props.type}`)
    }

    await handler(props.url)
    emit('click')
  }
  catch (error) {
    window.$notification.error('下载失败:')
    const errorMessage = error instanceof Error ? error.message : '下载过程中发生未知错误'

    window.$notification.error({
      title: '下载失败',
      message: errorMessage,
      duration: 3000,
    })
  }
  finally {
    downloading.value = false
  }
}

/**
 * 获取提示文本
 */
const tooltipText = computed(() => {
  if (props.tooltipContent) {
    return props.tooltipContent
  }

  const typeMap: Record<FileType, string> = {
    image: '图片',
    video: '视频',
    audio: '音频',
  }

  return `下载${typeMap[props.type]}`
})
</script>

<template>
  <BaseButton
    v-bind="$attrs"
    :class="props.class"
    :icon="props.icon"
    :size="props.size"
    :tooltip-content="tooltipText"
    :tooltip-placement="props.tooltipPlacement"
    :z-index="props.zIndex"
    :style="props.style"
    :loading="downloading"
    @click="handleDownload"
  />
</template>

<style scoped></style>
