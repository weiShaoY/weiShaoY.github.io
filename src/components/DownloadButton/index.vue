<script setup lang="ts">
import type { Placement } from 'element-plus'

import type { CSSProperties } from 'vue'

import {
  downloadAudio,
  downloadImage,
  downloadVideo,
} from '@/utils'

import { twMerge } from 'tailwind-merge'

defineOptions({
  name: 'DownloadButton',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  type: 'image',
  class: '',
  icon: 'blog-download',
  size: 40,
  tooltipContent: '',
  tooltipPlacement: 'bottom',
})

defineEmits(['click'])

/**
 * 组件传参
 */
type Props = {

  /** 下载地址 */
  url: string

  /** 文件类型 */
  type?: 'image' | 'video' | 'audio'

  /** 图标大小 */
  size?: number

  /**
   * 按钮的 class 类名
   * 支持 string、对象、数组的格式
   */
  class?: string | Record<string, boolean> | Array<string | Record<string, boolean>>

  /** 图标名称 */
  icon?: string

  /**
   * 图标的额外 class
   * 支持 string、对象、数组的格式
   */
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
 * 默认按钮类名
 */
const DEFAULT_CLASS = 'flex items-center justify-center'

/**
 * 处理 class，兼容 string | Record<string, boolean> | Array
 * @param input 输入的类
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
    return input.map(item => stringifyClass(item))
      .filter(Boolean)
      .join(' ')
  }

  return Object.entries(input)
    .filter(([_, value]) => value)
    .map(([key]) => key)
    .join(' ')
}

/**
 * 计算按钮的最终 class
 */
const computedButtonClass = computed(() => {
  return twMerge(DEFAULT_CLASS, stringifyClass(props.class))
})

/**
 * 计算图标的最终 class
 */
const computedIconClass = computed(() => {
  return stringifyClass(props.iconClass)
})

/**
 * 计算按钮样式
 */
const computedStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  ...props.style,
}))

/**
 * 是否正在下载
 */
const downloading = ref(false)

/**
 * 处理下载逻辑
 */
async function handleDownload() {
  if (downloading.value) {
    return
  }

  downloading.value = true

  try {
    if (!props.url) {
      throw new Error('下载URL不能为空')
    }

    if (!props.type) {
      throw new Error('文件类型不能为空')
    }

    const downloadHandlers = {
      image: downloadImage,
      video: downloadVideo,
      audio: downloadAudio,
    }

    if (!(props.type in downloadHandlers)) {
      throw new Error(`不支持的文件类型: ${props.type}`)
    }

    await downloadHandlers[props.type as keyof typeof downloadHandlers](props.url)
  }
  catch (error) {
    console.error('下载失败:', error)

    const errorMessage = error instanceof Error ? error.message : '下载过程中发生未知错误'

    window.$notification?.error({
      title: '下载失败',
      message: errorMessage,
      duration: 3000,
    })
  }
  finally {
    downloading.value = false
  }
}
</script>

<template>
  <div>
    <ElTooltip
      :placement="tooltipPlacement"
      :content="tooltipContent || `下载${type === 'image' ? '图片' : type === 'video' ? '视频' : '音频'}`"
      :z-index="zIndex"
      :disabled="hideTooltip"
    >
      <ElButton
        text
        quaternary
        class="!h-auto !p-0"
        @click="handleDownload"
      >
        <div
          :class="computedButtonClass"
          :style="computedStyle"
        >
          <template
            v-if="!downloading"
          >
            <slot>
              <SvgIcon
                :icon="icon"
                :size="size - 14"
                :class="computedIconClass"
              />
            </slot>
          </template>

          <template
            v-else
          >
            <Loading
              :size="size - 14"
            />
          </template>
        </div>
      </ElButton>
    </ElTooltip>
  </div>
</template>

<style scoped></style>
