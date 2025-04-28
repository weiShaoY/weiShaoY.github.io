<script lang="ts" setup>
import type { CSSProperties } from 'vue'

import { computed } from 'vue'

/**
 * 组件属性
 */
type MyComponentProps = {

  /**
   * 图片地址
   */
  src: string

  /**
   * 是否显示加载中动画
   */
  loading?: boolean

  /**
   * 是否开启点击预览大图
   */
  preview?: boolean

  /**
   * 图片宽度
   */
  width?: number | string

  /**
   * 图片高度
   */
  height?: number | string

  /**
   * 是否显示为头像组件
   */
  avatar?: boolean

  /**
   * 头像大小，仅在 avatar 模式下生效
   */
  size?: number

  /**
   * 图标大小（loading 图标和加载失败图标）
   */
  iconSize?: number

  /**
   * 附加的 class 类名
   * 支持 string、对象、数组的格式
   */
  class?: string | string[] | Record<string, boolean>

  /**
   * 自定义图片样式
   */
  style?: CSSProperties

}

/** 组件默认 props */
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
 * 计算图片样式
 */
const computedImageStyle = computed<CSSProperties>(() => ({
  ...props.style,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
}))
</script>

<template>
  <div
    class="h-full w-full flex items-center justify-center"
  >
    <!-- 头像模式 -->
    <el-avatar
      v-if="avatar"
      :size="size"
      :src="src"
      :class="props.class"
    >
      <img
        :src="src"
      >
    </el-avatar>

    <!-- 普通图片模式 -->
    <el-image
      v-else
      :class="props.class"
      :style="computedImageStyle"
      :src="src"
      :zoom-rate="1.2"
      :max-scale="7"
      :min-scale="0.2"
      show-progress
      hide-on-click-modal
      fit="contain"
      :initial-index="0"
      preview-teleported
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
