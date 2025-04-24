<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import { computed } from 'vue'

/**
 * 组件属性
 */
type MyComponentProps = {

  /**
   *   图片地址
   */
  src: string

  /**
   *   是否显示加载中
   */
  loading?: boolean

  /**
   *   style 样式
   */
  style?: CSSProperties

  /**
   *   是否激活点击预览
   */
  preview?: boolean

  /**
   *   高度
   */
  height?: number | string

  /**
   *   宽度
   */
  width?: number | string

  /**
   *   是否显示头像
   */
  avatar?: boolean

  /**
   *   头像大小
   */
  size?: number

  /**
   * 额外的 CSS 类名
   */
  class?: string

  /**
   *  图标大小 (loading图标 和 加载错误图标)
   */
  iconSize?: number
}

const props = withDefaults(defineProps<MyComponentProps>(), {
  loading: false,
  preview: true,
  width: '100%',
  height: '100%',
  avatar: false,
  size: 40,
  iconSize: 40,
})

/**
 *  计算头像的类名
 */
const computedAvatarClass = computed(() => {
  if (typeof props.class === 'string') {
    return props.class
  }

  return props.class
})

/**
 *  计算图片的类名
 */
const computedImageClass = computed(() => {
  if (typeof props.class === 'string') {
    return props.class
  }

  return props.class
})

/** 计算图片的样式 */
const computedImageStyle = computed<CSSProperties>(() => ({
  ...props.style,
  height:typeof props.height === 'number' ? `${props.height}px` : props.height,
  width:typeof props.width === 'number' ? `${props.width}px` : props.width,
}))

</script>

<template>
  <div
    class="h-full w-full flex items-center justify-center"
  >
    <el-avatar
      v-if="avatar"
      :size="size"
      :src="src"
      :class="`cursor-pointer ${computedAvatarClass}`"
    >
      <img
        :src="src"
      />
    </el-avatar>

    <el-image
      v-else
      :class="`${computedImageClass}`"
      :style="computedImageStyle"
      :src="src"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      show-progress
      hide-on-click-modal
      fit="contain"
      :initial-index="0"
      :preview-src-list="preview ? [src] : []"
      :z-index="102000"
    >
      <template
        #placeholder
      >
        <Loading
          :size="iconSize"
        />
      </template>

      <template
        #error
      >
        <div
          class="h-full w-full !flex-col !items-center !justify-center"
        >
          <SvgIcon
            icon="image-error"
            :size="iconSize"
          />

          <span>图片加载失败!</span>
        </div>
      </template>
    </el-image>
  </div>
</template>

<style lang="scss" scoped></style>
