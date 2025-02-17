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
  isLoading?: boolean

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
}

const props = withDefaults(defineProps<MyComponentProps>(), {
  loading: false,
  preview: true,
  width: '100%',
  height: '100%',
  avatar: false,
  size: 30,
})

/** 计算最终的样式 */
const computedStyle = computed<CSSProperties>(() => ({
  ...props.style,
  height: props.height,
  width: props.width,
}))

const computedClass = computed(() => `${props.class}`)
</script>

<template>
  <a-spin
    :loading="isLoading"
    class="h-full w-full"
  >
    <a-avatar
      v-if="avatar"
      :image-url="src"
      :size="size"
      :class="computedClass"
      :style="computedStyle"
    />

    <a-image
      v-else
      :src="src"
      class="border-radius h-full w-full"
      fit="contain"
      show-loader
      :height="height"
      :width="width"
      :preview="preview"
      :class="computedClass"
      :style="computedStyle"
    />
  </a-spin>
</template>

<style lang="less" scoped>
.border-radius :deep(.arco-image-img) {
  border-radius: 12px;
}
</style>
