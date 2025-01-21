<script setup lang="ts">
defineProps({
  /**
   * 是否显示头部
   * - 控制页面是否显示头部区域
   * @type {boolean}
   * @default true
   */
  showHeader: {
    type: Boolean,
    default: true,
  },

  /**
   * 是否显示设置按钮
   * - 控制页面是否显示设置按钮
   * @type {boolean}
   * @default false
   */
  showSetting: {
    type: Boolean,
    default: false,
  },

  /**
   * 是否显示返回按钮
   * - 控制页面是否显示返回按钮
   * @type {boolean}
   * @default false
   */
  showBack: {
    type: Boolean,
    default: false,
  },
})

/**
 *  是否自动适配
 */
const isScale = ref(true)

/**
 *  是否显示头部
 */
const isShowHeader = ref(true)

/**
 *  是否显示设置
 */
const isShowSetting = ref(false)

</script>

<template>
  <ScaleScreen
    width="1920"
    height="1080"
    :delay="500"
    :full-screen="false"
    :box-style="{
      background: '#03050C',
      overflow: isScale ? 'hidden' : 'auto',
    }"
    :auto-scale="isScale"
  >
    <BasicHeader
      v-if="isShowHeader"
      v-bind="$attrs"
      :show-setting="isShowSetting"
      :show-back="showBack"
    />

    <slot />
  </ScaleScreen>

  <Setting />
</template>

<style scoped></style>
